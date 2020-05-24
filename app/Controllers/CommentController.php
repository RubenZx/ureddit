<?php

namespace App\Controllers;

use App\Entities\Comments;
use App\Models\CommentsModel;
use App\Models\PostModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property CommentsModel $model
 */
class CommentController extends ResourceController {
  protected $modelName = CommentsModel::class;

  protected $format = 'json';

  public function comment($id = null) {
    /** @var Post */
    $postModel = new PostModel();
    $post = $postModel->find($id);
    if (is_null($post)) {
      return $this->failNotFound();
    }

    /** @var User */
    $user = $this->request->user;
    $data = $this->request->getJSON(true);
    $data['user_id'] = $user->id;
    $data['is_reply'] = isset($data['comment_id']);
    
    $id = $this->model->insert(new Comments($data));
    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }
    
    /** @method bool addComments(array|int $id)*/
    $post->addComments($id);

    return $this->respondNoContent();
  }

  public function view($post_id = null) {
    $postsModel = new PostModel();

    /** @var Post */
    $post = $postsModel->find($post_id);

    if (is_null($post)) {
      return $this->failNotFound();
    }

    return $this->respond(['data' => $this->nested($post->comments)]);
  }

  /**
   *
   * @param Comments[] $comments
   * @return void
   */
  private function nested($comments) {
    /** @var Comments[] */
    $nested = [];
    foreach ($comments as $comment) {
      $comment->user;
      $nested[$comment->id] = $comment->toRawArray();
      $nested[$comment->id]["children"] = [];
    }

    foreach ($comments as $comment) {
      if (!is_null($comment->comment_id)) {
        $parent = &$nested[$comment->comment_id];
        $parent["children"][] = &$nested[$comment->id];
      }
    }

    return array_values(
      array_filter($nested, function ($comment) {
        return is_null($comment["comment_id"]);
      })
    );
  }
}