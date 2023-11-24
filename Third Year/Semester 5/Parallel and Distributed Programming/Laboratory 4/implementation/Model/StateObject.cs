using System.Net;
using System.Net.Sockets;
using System.Text;

namespace implementation.Model;

public class StateObject
{
    public Socket socket = null; // client socket
    public const int BUFFER_SIZE = 512; // size of receive buffer
    public byte[] receiveBuffer = new byte[BUFFER_SIZE]; // receive buffer for incoming data
    public StringBuilder responseContent = new StringBuilder(); // response content buffer for incoming data
    public int clientID; // client ID for logging
    public string hostname; // hostname of the server
    public string endpointPath; // endpoint path of the server
    public IPEndPoint remoteEndPoint; // remote endpoint of the server
    public ManualResetEvent connectDone = new ManualResetEvent(false); // manual reset event for connection
    public ManualResetEvent sendDone = new ManualResetEvent(false); // manual reset event for sending
    public ManualResetEvent receiveDone = new ManualResetEvent(false); // manual reset event for receiving
}