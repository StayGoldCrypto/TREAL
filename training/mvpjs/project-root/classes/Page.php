<?php

class Page {
    private $title;
    private $menu;

    public function __construct($title, $menu) {
        $this->title = $title;
        $this->menu = $menu;
    }

    public function renderHeader() {
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>{$this->title}</title>
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'>
            <link rel='stylesheet' href='css/styles.css'>
        </head>
        <body>";
    }

    public function renderFooter() {
        echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js'></script>
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>
        <script src='js/script.js'></script>
        </body>
        </html>";
    }

    public function renderMenu() {
        $this->menu->render();
    }

    public function renderContent($content) {
        echo "<div class='container'>
            <div class='content'>
                {$content}
            </div>
        </div>";
    }

    public function renderPage($content) {
        $this->renderHeader();
        $this->renderMenu();
        $this->renderContent($content);
        $this->renderFooter();
    }
}
