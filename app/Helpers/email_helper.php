<?php

use Config\Services;

if (!function_exists('verify_by_email')) {
  function verify_by_email(string $userEmail, $subject = "Welcome to ureddit") {
    $random_token = bin2hex(random_bytes(16));
    cache()->save($random_token, $userEmail, HOUR);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject($subject);
    $email->setMessage(lang("Email.activateAccount",[
      'base_url' => base_url(),
      'activate_url' => base_url(['auth', 'active', $random_token])
    ]));
    $email->send();
  }
}