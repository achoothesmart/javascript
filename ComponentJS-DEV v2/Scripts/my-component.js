//---------Header Component-------------
// declarations

var headerConfig = {
    tag_name: 'header-component',
    html_template_id: 'header-template',
    scope_variables: {
        page_title: 'Component.js',
        page_description: 'Developed by Prasanna Ashok V'
    }
}

// creating component object
var headerComponent = new Component(headerConfig);

// loading component
headerComponent.load();

//----------------My Component-----------------------
var comConfig = {
    tag_name: 'my-component',
    html_template_id: 'my-template',
    scope_variables: {
        com_value : '*'
    }
}

var myComponent = new Component(comConfig);
myComponent.load();

