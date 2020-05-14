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
      'activate_url' => base_url(['api', 'auth', 'active', $random_token])
    ]));
    $email->send();
  }
}

if (!function_exists('recover_password')) {
  function recover_password(string $userEmail) {
    $random_token = bin2hex(random_bytes(16));
    cache()->save($random_token, $userEmail, 5 * MINUTE);
    $email = Services::email();
    $email->setTo($userEmail);
    $email->setSubject("Reset password");
    $email->setMessage(lang("Email.forgotPassword",[
      'reset_url' => base_url(['api', 'auth', 'reset-password', $random_token])
    ]));
    $email->send();
  }
}