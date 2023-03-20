<?php
function sql(){
  if(!class_exists('database')){
    class database extends SQLite3 {
        function __construct($path){
           $this->open($path);
        }
      }
  }

  $db = new database("./Database/database.db");
  if(!$db){
    echo "Error : Dtatbase does not exist"
    or exit();
  }

  return $db;
}
