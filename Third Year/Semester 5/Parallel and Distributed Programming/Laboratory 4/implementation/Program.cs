using System.Diagnostics;
using implementation.Implementation;

namespace implementation;

public class Program
{
    static void Main()
    {
        Stopwatch stopwatch = new Stopwatch();
        var hosts = new List<string>
        {
            "www.cs.ubbcluj.ro/~rlupsa/edu/pdp/index.html",
        };
        
        Console.WriteLine("-------------------------");
        Console.WriteLine("DIRECT CALLBACK");
        stopwatch.Start();
        DirectCallback.Run(hosts);
        stopwatch.Stop();
        TimeSpan directCallbackTime = stopwatch.Elapsed;
        
        Console.WriteLine("-------------------------");
        Console.WriteLine("TASKS");
        stopwatch.Restart();
        TaskMechanism.Run(hosts);
        stopwatch.Stop();
        TimeSpan taskMechanismTime = stopwatch.Elapsed;
        
        Console.WriteLine("-------------------------");
        Console.WriteLine("ASYNC/AWAIT MECHANISM");
        stopwatch.Restart();
        AsyncTaskMechanism.Run(hosts);
        stopwatch.Stop();
        TimeSpan asyncTaskMechanismTime = stopwatch.Elapsed;
        
        Console.WriteLine("Direct callback: {0}", directCallbackTime);
        Console.WriteLine("Task mechanism: {0}", taskMechanismTime);
        Console.WriteLine("Async/await task mechanism: {0}", asyncTaskMechanismTime);
    }
}