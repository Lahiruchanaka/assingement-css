import com.jfoenix.controls.JFXTextField;
import javafx.event.ActionEvent;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerUIController {

    public TextArea msgBox;
    public Label lblStatus;
    public JFXTextField txtMsg;
    public Label lblClientStatus;

    //----------------

    static ServerSocket serverSocket;
    static Socket socket;
    static DataInputStream dataInputStream;
    static DataOutputStream dataOutputStream;

    //----------------

    public void initialize(){
        new Thread(()->{
            try {
                serverSocket = new ServerSocket(6000);
                lblStatus.setText("Server Started");
                socket = serverSocket.accept();

                dataInputStream = new DataInputStream(socket.getInputStream());
                dataOutputStream = new DataOutputStream(socket.getOutputStream());
                String messageIn="";

                while (!messageIn.equals("end")){
                    messageIn= dataInputStream.readUTF();
                    msgBox.appendText("\n Client :- "+messageIn.trim());
                }


            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void sendOnAction(ActionEvent actionEvent) throws IOException {
        dataOutputStream.writeUTF(txtMsg.getText().trim());
        txtMsg.setText("");
    }
}
