<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Auth extends BaseConfig {
  /**
   *
   * @var string
   */
  public $jwtAlgorithm = "HS256";

  /**
   *
   * @var null|string
   */
  public $jwtKey;

  /**
   *
   * @var null|string
   */
  public $jwtRefreshKey;
}