<?php
require_once 'classes/Menu.php';
require_once 'classes/Page.php';

$menuItems = [
    ['label' => 'Borrowers', 'link' => 'https://sabitashop.in/test/mvpjs/borrowers/'],
    ['label' => 'Loan Application', 'link' => 'https://sabitashop.in/test/mvpjs/loanapp/'],
    ['label' => 'Loan Disbursement', 'link' => 'https://sabitashop.in/test/mvpjs/loandisa/'],
    ['label' => 'Login', 'link' => 'https://sabitashop.in/test/mvpjs/login/'],
    ['label' => 'NFT', 'link' => 'https://sabitashop.in/test/mvpjs/NFT/'],
    ['label' => 'Properties', 'link' => 'https://sabitashop.in/test/mvpjs/properties/'],
    ['label' => 'Real Estate Acquisition', 'link' => 'https://sabitashop.in/test/mvpjs/realstateadq/'],
    ['label' => 'Register', 'link' => 'https://sabitashop.in/test/mvpjs/register/'],
    ['label' => 'Token', 'link' => 'https://sabitashop.in/test/mvpjs/token/'],
];

$menu = new Menu($menuItems);
$page = new Page('My Spectacular Website', $menu);

$content = "<h1>Welcome to My Spectacular Website</h1>
<p>This is the home page of my awesome website.</p>";

$page->renderPage($content);
