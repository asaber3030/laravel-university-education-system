<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: 'Arial';
    }
    .actions {
      display: flex;
      gap: 5px;
      margin: 18px 0;
    }
    .btn {
      display: block;
      padding: 10px 15px;
      margin-right: 8px;
      border-radius: 5px;
      background-color: #222;
      color: lightgray;
      text-decoration: none;
    }
    .btn:hover { background-color: #333; }

    .professor-top {
      display: flex;
      background-color: #f1f1f1;
      gap: 15px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 3px #ddd;
      margin: 25px;
    }
    .professor-top h4 {
      display: block;
    }
    .professor-top span {
      display: block !important;
      color: gray;
    }
    img { width: 40px; height: 40px; }

    .message-content {
      padding: 0 25px;
      font-size: 16px;
    }

    .importance {
      background-color: #333;
      color: lightgray;
      margin: 5px 25px;
      border-radius: 5px;
      padding: 15px;
    }

  </style>

  <title>Mail</title>
</head>
<body>

  <div class="sending-mail-content">
    <div class="professor-top">
      <div class="image">
        <img src="{{ $message->embed(asset(professor()->picture)) }}" alt="">
      </div>
      <div class="text">
        <h4>Dr. {{ professor()->name }}</h4>
        <span>{{ professor()->title }}</span>
      </div>
    </div>

    <div class="message-content">
      <h3>{{ $messageSubject }}</h3>
      <div class="mail-content" style="margin-top: 16px; color: gray; line-height: 1.6">
        {{ $messageContent }}
      </div>
      <div class="actions">
        <a href="mailto:{{ professor()->email }}" class='btn'>Reply</a>
      </div>
    </div>

    <div class="importance normal">
      <b>Importance Note </b> Normal
    </div>

  </div>

</body>
</html>
