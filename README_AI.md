# Set up custom model for AI coding in VSCode

## Overview: using Foundry toolkit for VSCode

1. Install and connect the AI toolkit extension (now called Foundry toolkit for VSCode) to your Foundry project.
1. Configure GitHub Copilot in VSCode.
3. Deploy the model you need in Microsoft Foundry or by using the AI toolkit extension.
4. Select the model in GitHub Copilot.

### AI toolkit extension (now called Foundry toolkit for VSCode)

Follow the instructions in the [Foundry toolkit for VSCode](https://code.visualstudio.com/docs/intelligentapps/overview) documentation. Set your Foundry project and connect it to the extension. 

### Configure GitHub Copilot in VSCode

See the [docs](https://code.visualstudio.com/docs/copilot/overview) for more details. A Github account is required to use GitHub Copilot. 

### Add custom model to Foundry toolkit and GitHub Copilot

Use the command palette in VSCode (Ctrl+Shift+P) and search for `Chat: Manage language models`. In this overlay window, you can see the list of supported models. In this example, we will use `GPT-5.4-nano` under the category `Microsoft Foundry via AI toolkit`. Select it and click on the eye icon on the left to make it appear in the list of models in GitHub Copilot.

### Select the model in GitHub Copilot
Now you can select the model in GitHub Copilot - the first time you select it, it will ask you to deploy the model with the AI toolkit extension. After that, you should be able to use the model in GitHub Copilot.

## Alternatively: without the Foundry toolkit, configure as a custom model in Azure

If you don't want to use the Foundry toolkit in VSCode, you can manually deploy your model in Foundry and grab the API key for the deployment in the portal. Use the command palette in VSCode (Ctrl+Shift+P) and search for `Chat: Manage language models`. Click on `+Add models` and select the provider `Azure`. Provide the API key and set the url to the endpoint of your deployment, which should look like this:

    https://{your_foundry_resource}.services.ai.azure.com/openai/deployments/{your_deployment_name}/chat/completions

You can select the model in GitHub Copilot and start using it.