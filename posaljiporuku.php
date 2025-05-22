<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Uključi prikaz SMTP grešaka
    $mail->SMTPDebug = 2;  // 2 prikazuje kompletan ispis, 0 za isključivanje
    $mail->Debugoutput = 'html'; 

    if (isset($_POST['email'], $_POST['ime'], $_POST['prezime'], $_POST['poruka'])) {
        // SMTP podešavanja
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'nemanjasovilj52@gmail.com'; // Gmail nalog
        $mail->Password = 'bkky ykyn jqjq jsnr'; // **Proveri da li je ovo App Password**
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Podešavanje podataka
        $mail->setFrom($_POST['email'], $_POST['ime'] . ' ' . $_POST['prezime']);
        $mail->addAddress('nemanjasovilj52@gmail.com'); 
        $mail->Subject = 'Poruka sa sajta';
        $mail->Body = $_POST['poruka'];

        // Slanje poruke
        if ($mail->send()) {
            echo "Poruka je uspešno poslata!";
        } else {
            echo "Došlo je do greške: " . $mail->ErrorInfo;
        }
    } else {
        echo "Neka polja nisu popunjena.";
    }
} catch (Exception $e) {
    echo "Greška prilikom slanja poruke: {$mail->ErrorInfo}";
}

// Ispis POST podataka za debug
var_dump($_POST);
?>
