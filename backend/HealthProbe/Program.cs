using System.Net.Http;

var url = args.Length > 0 ? args[0] : "http://localhost:5000/health";
try
{
    using var client = new HttpClient
    {
        Timeout = TimeSpan.FromSeconds(3)
    };
    var response = await client.GetAsync(url);
    if (response.IsSuccessStatusCode)
    {
        return 0;
    }
    return 1;
}
catch
{
    return 1;
}
