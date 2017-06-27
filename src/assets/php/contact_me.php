<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: content-type");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
$email = $request['email'];
$phone = $request['phone'];
$message = $request['message'];
$subject = $request['subject'];
$name = $request['name'];
$to_email = "noreply@jerrelsogoni.com";

$contact = "<p><strong>Name:</strong> $name</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Phone:</strong> $phone</p>";
$content = "<p>$message</p>";

$email_subject = "$subject";

$email_body = '<html><body>';
$email_body .= "$contact $content";
$email_body .= '</body></html>';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";

$headers = "From: $to_email \r\n";
$headers .= "Reply-To: $email \r\n";

if (mail($to_email,$email_subject,$email_body,$headers)){

   $response_array['status'] = 'success';
   $response_array['from'] = $email;
   echo json_encode($response_array);
   echo json_encode($email);
   return $email;

}
$response_array['status'] = 'error';
echo json_encode($response_array);

?>