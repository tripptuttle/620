<?php
session_start();
//$name  = $_SERVER['HTTP_DISPLAYNAME'];
//$onyen = $_SERVER['HTTP_UID'];
//$email = $_SERVER['HTTP_MAIL'];
//$pid   = $_SERVER['HTTP_PID'];
//$dept  = $_SERVER['HTTP_DEPARTMENTNUMBER'];
//$authUsers = array('katierc', 'ttuttle')
set_include_path(".:/lib");
require_once 'include.php';

?>
<!doctype html>
<html>
<head>
   <?php
//$name  = $_SERVER['HTTP_DISPLAYNAME'];
//$onyen = $_SERVER['HTTP_UID'];
//$email = $_SERVER['HTTP_MAIL'];
//$pid   = $_SERVER['HTTP_PID'];
//$dept  = $_SERVER['HTTP_DEPARTMENTNUMB  asd?>

 <script src="assets/js/jquery.min.js" type="text/javascript"></script>
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <script src="assets/js/JSON.js"></script>
    <link rel="stylesheet" href="assets/scss/main.css" type="text/css">
    <link rel="stylesheet" href="assets/css/temp.css" type="text/css">
    <meta charset="UTF-8">
    <title>Photo Mover - Submittable to SmugMug</title>
</head>
<body>
<header class="navbar navbar-default navbar-fixed-top">
 <nav class="container relative">
         <h1>CGI PHOTOMOVER</h1>
    <ul id="nav-settings">
        <li><a href="resetSession.php">RESET SESSION</a></li>
        <li><a href="#">SETTINGS</a></li>
        <li><a href="#">LOG OUT</a></li>
    </ul>
</nav>
</header>
<main class="container">
    <section class="row " id="sub-category">
        <div class="col-sm-12">
            <h1>1. Select Source Category</h1>
            <p class="instructions">Choose a Submittable category to begin the process</p>
            <label for="sub-category-select">Current Submittable Categories
                <select title="sub-cat" name="sub-categories" id="sub-category-select" class="form-control">
                    <?php
                    foreach ($cat as $catNum => $catName) {
                        echo "\n<option value='$catNum'>$catName</option>";
                    }
                    ?>
                </select>
            </label>
            <button class="btn" id="sub-category-chosen">Save Category and Next</button>
        </div>
    </section>
    <section class="row hidden step" id="sub-filters-sect">
        <div class="col-sm-12">
            <h1>2. Filter</h1>
            <p class="instructions">Choose any of the following criteria to <strong>INCLUDE</strong>
                an image with this tag in the transfer.</p>
            <div id="sub-filters" class="row clearable step2">

            </div>
            <button class="btn" id="sub-filters-chosen">Save Filters and Next</button>
        </div>
    </section>
    <section class="row hidden step" id="sub-labels-sect">
        <div class="col-sm-12">
            <h1>3. Labels</h1>
            <p class="instructions">Choose the Submittable labels to transfer to SmugMug as
                keywords and made any edits to the mapping. This will NOT change the data stored
                in Submittable.
            </p>
            <div id="sub-labels" class="clearable step3">

            </div>

        </div>
    </section>
    <section class="row hidden step" id="sub-fields-sect">
        <div class="col-sm-12 step s-field-bounds">
            <h1>4. Choose and Order Fields</h1>
            <p class="instructions">Only the Location Field Choice is Active in this section</p>
            <div id="s-fields-choose-location" class="">
                <label for="s-location-field" class="form-control">
                    <select id="s-location-field" class="form-control">
                     <option value="none" id="none-location-field-option" class="location-field-select-option">No Location Field</option>
                    </select>
                </label>
            </div>
            <div class="row hidden">
                <div class="col-sm-6">
                    <h2>Fields from Submittable - NON FUNCTIONAL</h2>
                    <ul id="sub-fields" class="clearable step4"></ul>
                </div>
                <div class="col-sm-6" id="sm-field-map">
                    <h2>Photo Title</h2>
                    <ul class="ui-widget-header drop-container sortable clearable step4" id="sm-title">

                    </ul>
                    <h2>Photo Caption</h2>

                    <ul class="ui-widget-header drop-container sortable clearable step4" id="sm-caption">

                    </ul>
                </div>
            </div>
     <button class="btn" id="data-map-chosen">Save Choices and Next</button>



        </div>
    </section>
    <section class="row step hidden" id="sm-gallery-create">
        <div class="col-sm-12">
            <h1>5. SmugMug Gallery Creation</h1>
            <p class="instructions">Create a name for the new album in which the photos will
                be placed. All new albums will be placed in the PhotoMover folder, and marked as private until you move or change the album.
            </p>
                <div class="form-group">
                    <label for="sm-new-album-title">Album Title</label><input id="sm-new-album-title" class="form-control">
                </div>
                <div class="form-group">
                    <label for="sm-new-album-nicename">Album Name</label><input id="sm-new-album-nicename" class="form-control">
                    <p class="help-block">Albums names must start with a capital letter and not include spaces.</p>
                </div>
                <div class="form-group">
                    <label for="sm-new-album-description">Album Description</label><textarea id="sm-new-album-description" class="form-control">
                    </textarea>
                        <p class="help-block">Optional, but a good place to describe what criteria were used to create the album.</p>
                </div>
                <button id="sm-gallery-create-request" class="btn">Create Album</button>
            <div id="sm-album-response" class="server-response hidden">

                </div>
        </div>
    </section>
</main>
<div class="log" id="log" style="overflow-y: scroll; max-height: 600px;">
    <pre>

    <?php
    print_r($_SESSION);
    echo "Session ID: " . session_id();
    ////print_r($client);
    //
    //
    //


    echo "</pre>";
    ?>
</div>
</body>
</html>