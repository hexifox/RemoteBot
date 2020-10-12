using System;
using System.Diagnostics;
using System.IO;
using System.IO.Ports;
using System.Text.RegularExpressions;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Linq;

namespace SerialPorts
{

    
    class Program
    {
        /// Strings to keep last GPS Pos
        public static string La_Last = "None";
        public static string Lo_Last = "None";
        public static string status = "IDLE";

        static void Main(string[] args)
        {
            /// Serial Connection settings
            SerialPort mySerialPort = new SerialPort("COM9");
            mySerialPort.BaudRate = 9600;
            mySerialPort.Parity = Parity.None;
            mySerialPort.StopBits = StopBits.One;
            mySerialPort.DataBits = 8;
            mySerialPort.Handshake = Handshake.None;
            mySerialPort.DataReceived += new SerialDataReceivedEventHandler(DataReceivedHandler);
            mySerialPort.Open();
            
            
            /// Console settings, and prepared exit
            Console.WriteLine("Press any key to continue...");
            Console.WriteLine();
            Console.ReadKey();
            mySerialPort.Close();
        }

        private static void DataReceivedHandler(object sender, SerialDataReceivedEventArgs e)
        {
            string cs = @"server=46.101.1.113;userid=RemoteBot_Admin;
        password=ReMote_BOT_1302;database=RemoteBot";
            MySqlConnection conn = null;
            SerialPort sp = (SerialPort)sender;
            string indata = sp.ReadLine();
            Console.WriteLine("Data Received:");
            if (indata.Contains("StrVal"))
            {
                /// Get Variables Measurements
                Console.WriteLine(indata);
                string time = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
                Console.WriteLine(time);
                string temp = indata.Split(':', ';')[1];
                Console.WriteLine(temp);
                string pres = indata.Split(':', ';')[3];
                Console.WriteLine(pres);
                string alt = indata.Split(':', ';')[5];
                Console.WriteLine(alt);
                string sl_p = indata.Split(':', ';')[7];
                Console.WriteLine(sl_p);
                string lumi = indata.Split(':', ';')[9];
                Console.WriteLine(lumi);
                string humi = indata.Split(':', ';')[11];
                Console.WriteLine(humi);
                string rdrop = indata.Split(':', ';')[13];
                Console.WriteLine(rdrop);
                /// Upload Variables Measurements to assigned MySQL Database
                try
                {
                    conn = new MySqlConnection(cs);
                    conn.Open();
                    MySqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "INSERT INTO Measurements(Time,Temperature,Pressure,Altitude,Sea_Level_Pressure,Humidity,Luminosity,Rain_Drop) VALUES(?Time,?Temperature,?Pressure,?Altitude,?Sea_Level_Pressure,?Humidity,?Luminosity,?Rain_Drop)";
                    cmd.Parameters.AddWithValue("?Time", time);
                    cmd.Parameters.AddWithValue("?Temperature", temp);
                    cmd.Parameters.AddWithValue("?Pressure", pres);
                    cmd.Parameters.AddWithValue("?Altitude", alt);
                    cmd.Parameters.AddWithValue("?Sea_Level_Pressure", sl_p);
                    cmd.Parameters.AddWithValue("?Humidity", humi);
                    cmd.Parameters.AddWithValue("?Luminosity", lumi);
                    cmd.Parameters.AddWithValue("?Rain_Drop", rdrop);
                    cmd.ExecuteNonQuery();
                }
                catch (MySqlException ex)
                {
                    Console.WriteLine("Error: {0}", ex.ToString());
                }
                finally
                {
                    if (conn != null)
                    {
                        conn.Close();
                    }
                }

            }
            else if (indata.Contains("StrGPS"))
            {
                Console.WriteLine(indata);
                /// Don't Take the values if GPS off
                if (indata.Contains("0 0"))
                {
                    return;
                }
                else
                {
                    /// Get GPS Values
                    string time = indata.Split(';',' ')[1];
                    Console.WriteLine(time);
                    string La = indata.Split(';',' ')[3];
                    Console.WriteLine(La);
                    string Lo = indata.Split(';',' ')[6];
                    Console.WriteLine(Lo);
                    string alt = indata.Split(';',' ')[9];
                    Console.WriteLine(alt);
                    /// Change status if robot moving
                    /// Needs Checking the last and current GPS pos
                    if (new[] { La, La_Last, Lo, Lo_Last }.All(XmlWriterTraceListener => XmlWriterTraceListener != "None"))
                    {
                        if (La != La_Last && Lo != Lo_Last)
                        {
                            status = "ON_MOVE";
                        }
                        else
                        {
                            status = "IDLE";
                        }

                    }
                    La_Last = La;
                    Lo_Last = Lo;
                    /// Upload GPS Values to assigned MySQL Database
                    try
                    {
                        conn = new MySqlConnection(cs);
                        conn.Open();
                        MySqlCommand cmd = conn.CreateCommand();
                        cmd.CommandText = "INSERT INTO GPS(Time,Lat,Lon,Alt,Status) VALUES(?Time,?Lat,?Lon,?Alt,?Status)";
                        cmd.Parameters.AddWithValue("?Time", time);
                        cmd.Parameters.AddWithValue("?Lat", La);
                        cmd.Parameters.AddWithValue("?Lon", Lo);
                        cmd.Parameters.AddWithValue("?Alt", alt);
                        cmd.Parameters.AddWithValue("?Status", status);
                        cmd.ExecuteNonQuery();
                    }
                    catch (MySqlException ex)
                    {
                        Console.WriteLine("Error: {0}", ex.ToString());

                    }
                    finally
                    {
                        if (conn != null)
                        {
                            conn.Close();
                        }
                    }

                }


            }
        }
    }
}