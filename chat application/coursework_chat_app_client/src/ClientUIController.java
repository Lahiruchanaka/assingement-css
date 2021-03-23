import com.jfoenix.controls.JFXTextField;
import javafx.event.ActionEvent;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;

public class ClientUIController {

    public TextArea msgBox;
    public JFXTextField txtMsg;
    //-----------------------------
    static Socket socket;
    static DataOutputStream dataOutputStream;
    static DataInputStream dataInputStream;

    public void initialize(){
        new Thread(()->{
            try{
                socket= new Socket("localhost",6000);
                dataInputStream= new DataInputStream(socket.getInputStream());
                dataOutputStream= new DataOutputStream(socket.getOutputStream());

                String messageIn="";

                while (!messageIn.equals("bye")){
                    messageIn= dataInputStream.readUTF();
                    msgBox.appendText("\n Server :- "+messageIn.trim());
                }
            }catch (IOException e){

            }
        }).start();

    }

    public void sendOnAction(ActionEvent actionEvent) throws IOException {
        String reply="";
        reply=txtMsg.getText();
        dataOutputStream.writeUTF(reply);
        txtMsg.setText("");
    }
}
