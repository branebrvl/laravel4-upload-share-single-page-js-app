<?php

class UploadController extends BaseController {

  public function upload(){
      $uploadFolder = "uploaded-files";
      // $destinationPath = base_path(). '/' . "upload" . '/';
      $destinationPath = public_path(). '/' . $uploadFolder . '/';

      if(Input::hasFile('myfile')){

          $file = Input::file('myfile'); // your file upload input field in the form should be named 'file'

          // Declare the rules for the form validation.
          $rules = array('myfile'  => 'mimes:jpg,jpeg,bmp,png');
          $data = array('myfile' => Input::file('myfile'));
// var_dump($file);
          $files = [];

          // Validate the inputs.
          $validation = Validator::make($data, $rules);

          if ($validation->fails())
          {
              return Response::json('error', 400);
          }

          if(is_array($file))
          {
              foreach($file as $part) {
                  $filename = $part->getClientOriginalName();
                  $uploadSuccess = $part->move($destinationPath, $filename);
                  $files[] = $uploadFolder . '/' . $filename;
              }
          }
          else //single file
          {
              $filename = $file->getClientOriginalName();
              $uploadSuccess = Input::file('myfile')->move($destinationPath, $filename);
              $files[] = $uploadFolder . '/' . $filename;
          }

          if( $uploadSuccess ) {
              // return Redirect::to('/')->with('message', '/upload/'.$filename);
              return Response::json(array('files' => $files), 200);
          } else {
              return Response::json('error', 400);
          }

      } else {
              return Response::json('no file chosen', 400);
      }
  }

}
