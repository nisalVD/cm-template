# CM-Template Wordpress Plugin
The Condition Monitoring (CM) Template is a system that monitors the climate statistics surrounding the IoT device it is connected to. This is the Wordpress plugin that can be used to augment the user's website by displaying data captured from the IoT device that is being used by the CM-Template.

## About the CM-template
It is based off an earlier project called [Wimo](https://github.com/Conctr/cmtemplate), which was designed with the intention to monitor the atmospheric conditions through an IoT device for storing wine. It links up with the Mystic Pants Conctr device to handle all of the backend related requirements. The CM-template is intended to expand upon this functionality and make it more versatile and usable for a wider variety of purposes beyond monitoring wine products.

To increase the accessibility of this program, we have created a Wordpress plugin to help streamline the front-end requirements and allow a business who needs to quickly setup a website with CM-template functionality. You can use the plugin to monitor the atmospheric conditions surrounding the IoT device, and view the statistics directly from your Wordpress website. It currently connects to Mystic Pants C1 devices, and potentially other devices in the near future.

## Getting Started

## For Developers
* Clone or Fork the repository on Github
* Enter 'yarn install' into the command line to install dependencies
* Create a 'config.json' file in the root directory (i.e. where all the JSON files are) enter the following code:

```json
{
  "proxyURL": "http://localhost:8888/" 
}
```
Add your own wordpress dev server address into proxy URL above

* If you are implementing changes then enter 'yarn start' in the command line
* If you want a compressed version for deployment purposes, enter 'yarn build' in the command line

## For Wordpress 
### Installation
1. Acquire the zip file for the CM-template (for developers compress a 'yarn build' of the code)
2. Plugin menu from dashboard
3. Click on Add new tab click on Upload Plugin
4. Select file and click Install Now
5. This should take you to a page requesting if you want to activate the plugin now, which you can choose to accept
6. Otherwise, you can activate it from the plugin page

### Get your Authorisation Keys for the plugin
![conctr](https://preview.ibb.co/f2Lc3H/conctr.png)
1. Enter https://conctr.com/ and create an account
2. Log into Conctr, you will get taken to the dashboard
3. Select your device below
4. On the next screen, click on the Models tab
5. Identify the model for the device that you are using and then click on Example Code
6. Click on the information tab and you can view your Application Id and API key
7. To get your Device Id, go to the Devices tab 
8. Click on Search under the Data Fields section and then click on Select/List under the Devices windows
9. In the popup window, you can view all devices that you own, identify the device that you own and look for the Device Id on the left-hand column labelled Device Id

### Input your Authorisation Keys
![admin](https://preview.ibb.co/jBTEiH/admin_page.png)
1. Access the CM Admin menu and click on CM Admin Menu
2. Enter your Authorisation Keys in the appropriate sections
3. Click on Save Changes when you are done

### Put the plugin on the site using Shortcode
![shortcode](https://preview.ibb.co/i5oEiH/add_shortcode.png)
1. Go to the Appearance tab on the Wordpress dashboard and enter the Widgets submenu
2. Select the Text widget and drag it to the desired location on the right-hand side of the page
3. Enter the shortcode [cm-template] in the text-area and save when ready
4. When you view your page, you should see the widget appear in the section that you placed it in

## Customisation

### Displayed Data and Alert Settings
![alert-settings](https://preview.ibb.co/jJBTAx/alert_settings.png)
1. Access the CM Admin menu and click on Alert Setting Page
2. You can toggle the statistics you want to view in the checkboxes at the top of the page
3. You can customise the warning thresholds (the maximum and minimum points when the statistics begin to flash warning colours) underneath
4. If you are satisfied, click the Update button at the bottom

### Customise the User Interface
![UI](https://preview.ibb.co/fPpyAx/edit_appearance.png)
1. Access the CM Admin menu and click on CM Edit Appearance
2. You will see an interactive box that contains a mock-interface with all the chart elements which you can customise
3. Click on the element which you want to customise and a text-field (for writing colors in) and a color-picking field will appear
4. Type in or select the color of your choice in one of the two fields and press ‘OK’ to see a preview of the effect of your choice.
5. Save changes when you are satisfied with your choices

## Submit Plugin to Wordpress
* Sign up for an account on https://wordpress.org/.
* [Submit your plugin for review](https://wordpress.org/plugins/developers/add/)
* After your plugin is [manually reviewed](https://developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/#questions-about-submissions-and-approval), it will either be approved or you will be emailed and asked to provide more information and/or make corrections.
* Once approved, you’ll be given access to a [Subversion Repository](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/) where you’ll store your plugin.
* Shortly after you upload your plugin (and a readme file!) to that repository, it will be automatically displayed in the [plugins browser](https://wordpress.org/plugins/).
* Check out the [FAQ](https://developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/) for more information.

### Readme Files
To make your entry in the plugin browser most useful, each plugin should have a readme file named readme.txt that [adheres to the WordPress plugin readme file standard](https://wordpress.org/plugins/readme.txt). You can put your readme file through the [readme validator](https://wordpress.org/plugins/developers/readme-validator/) to check it.

## Utilised Technologies
* Conctr API 
* Wordpress API
* React.js
* Chart.js ("dependency": "react-chartjs-2")
* SCSS
* CSS Element Queries
* PHP
* React FontAwesome
* Webpack
* HueBee Color Picker
* Axios
* Babel

## Authors
* Jared Hutchinson
* Nisal Don
* Mizuki Zenta 

## Acknowledgements
* https://github.com/deliciousbrains/wp-react-boilerplate for the template
* Thank you to the Wimo team for setting up the groundwork for this application!


