<?php

use Nette\Utils\Random;

  function generateFileName(
    $includeUniqueID = true,
    $includeTime = true,
    $randomText = true,
  ) {
    $timeValue = $includeTime ? time() : Random::generate(10);
    $uniqueID = $includeUniqueID ? uniqid() : Random::generate(10);
    $randomTextValue = $randomText ? Random::generate(10) : '';

    return $timeValue . '_' . $uniqueID . '_' . $randomTextValue . '.';
  }
