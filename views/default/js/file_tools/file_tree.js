/**
 * JS file for the file_tree widget
 */
define(function(require){
	var $ = require('jquery');
	var elgg = require('elgg');
	var Ajax = require('elgg/Ajax');
	
	function toggle_content() {
		var $link = $(this);
		var $li = $link.closest('.elgg-item-object-folder');
		
		if ($li.find('> .elgg-list').length) {
			// content already loaded
			$li.find('> .elgg-list').toggle();
			$li.find('> .elgg-listing-full > .elgg-output').toggle();
			$link.find('> span').toggleClass('hidden');
			
			return;
		}
		
		var ajax = new Ajax();
		ajax.view('object/folder/file_tree_content', {
			data: $link.data(),
			success: function(data) {
				$li.append(data);
				
				$li.find('> .elgg-listing-full > .elgg-output').hide();
				$link.find('> span').toggleClass('hidden');
			}
		});
	};
	
	function init() {
		$(document).on('click', '.elgg-widget-instance-file_tree a.file-tools-file-tree-toggle-content', toggle_content);
	};
	
	init();
});
