function Bedrock() {
    var payload_cloaudv2 = {
        "prompt": "\n\nHuman: Who are you?\n\nAssistant:",
        "max_tokens_to_sample": 300,
        "temperature": 0.5,
        "top_k": 250,
        "top_p": 1,
        // "stop_sequence": [
        // "\n\nHuman:"
        // ],
        "anthropic_version": "bedrock-2023-05-31"
    };

    var payload = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1000,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Hello! If I am hungry, what should I eat?"
                    }
                ]
            }
        ]
    }


    // var payload = {
    //   "prompt": "Please generate a funny Haiku about software engineering.",
    //   "maxTokens": 300,
    //   "temperature": 0.5,
    //   "topP": 0.9
    // };

    const scriptProperties = PropertiesService.getScriptProperties();
    const AWS_ACCESS_KEY = scriptProperties.getProperty('AWS_ACCESS_KEY');
    const AWS_SECRET_KEY = scriptProperties.getProperty('AWS_SECRET_KEY');

    var modelName = "anthropic.claude-3-sonnet-20240229-v1:0"
    // var modelName = "anthropic.claude-v2"

    var stringPayload = JSON.stringify(payload);
    var region = 'us-west-2'

    AWS.init(AWS_ACCESS_KEY, AWS_SECRET_KEY);

    // var res = AWS.request(service="bedrock", region=region, action="ListFoundationModels", params={}, method='GET', payload='',  headers={}, uri='/foundation-models')

    // Logger.log(res)

    var res = AWS.request(service = "bedrock-runtime", region = region, action = "", params = {}, method = 'POST', payload = stringPayload, headers = { 'Content-Type': 'application/json' }, uri = `/model/${modelName}/invoke`);
    Logger.log(res);
    Logger.log(JSON.parse(res).content[0].text);
    return JSON.parse(res).content[0].text

}

