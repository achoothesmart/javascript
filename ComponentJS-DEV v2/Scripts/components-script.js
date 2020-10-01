function Component(config) {
    // loading config values
    this.component_name = config.tag_name; // tag name
    this.template = ''; // html template
    if (config.html_template != null) {
        this.template = config.html_template;
    }
    else {
        try {
            this.template = document.getElementById(config.html_template_id).innerHTML;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    this.variables = config.scope_variables; // component variables hash
    // member variables
    this.component_nodes = [];
    // member methods
    this.processTemplate = processTemplate;
}

Component.prototype.load = function () {
    console.log("Loading template for " + this.component_name);
    // find all components and insert updated html templates
    lst_components = document.querySelectorAll(this.component_name);
    var com_template = this.template;
    var com_variables = this.variables;
    var component_nodes = this.component_nodes;
    lst_components.forEach(function (com_node) {
        var res_html = this.processTemplate(com_node, com_template, com_variables);
        com_node.innerHTML = res_html;
        component_nodes.push(com_node);
    });
    this.component_nodes = component_nodes;
}

function processTemplate(com, com_template, com_variables) {
    var attributes_len = com.attributes.length;
    for (var i = 0; i < attributes_len; ++i) {
        var attr = com.attributes[i];
        var scope_var = "{{" + attr.name + "}}";
        // replace all scope variables with respective attribute values in com_template
        while (com_template.indexOf(scope_var) != -1) {
            com_template = com_template.replace(scope_var, attr.value);
        }
    }
    for (var com_var in com_variables) {
        var scope_var = "{{" + com_var + "}}";
        // replace all scope variables with respective attribute values in com_template
        while (com_template.indexOf(scope_var) != -1) {
            com_template = com_template.replace(scope_var, com_variables[com_var]);
        }
    }

    // replace 'undefined' to undefined scope variables {{xxx}}
    var str = com_template;
    while (str.indexOf('{{') != -1) {
        var undefined_var = str.substr(str.indexOf('{{'), str.indexOf('}}') - str.indexOf('{{') + 2);
        console.error('Scope Variable ' + undefined_var + ' is not defined in template' );
        var str = str.replace(undefined_var, '')
    }

    com_template = str;
    return com_template;
}