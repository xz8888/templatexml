import jQuery from 'jquery';

//geting the list of attributes, from stackoverflow but modified by sean 
(function($) {
    $.fn.getAttributes = function(filter) {
        var attributes = [];

        if( this.length ) {
            $.each( this[0].attributes, function( index, attr ) {

            	if (attr.name.indexOf(filter) >= 0){
                	attributes[attr.name] = attr.value;
            	}
            } ); 
        }

        return attributes;
    };
})(jQuery);