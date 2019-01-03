/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __values=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}};define(["require","exports","./../InlineRelation/AjaxDispatcher","../../Utility/MessageUtility","jquery","TYPO3/CMS/Backend/FormEngine","TYPO3/CMS/Backend/FormEngineValidation","../../Icons","../../InfoWindow","../../Modal","../../Notification","nprogress","../../Severity","Sortable","../../Utility"],function(e,t,n,r,o,i,a,l,s,d,c,u,p,g,h){"use strict";var f,v,m,y,b,S,j;return(v=f||(f={})).toggleSelector='[data-toggle="formengine-inline"]',v.controlSectionSelector=".t3js-formengine-irre-control",v.createNewRecordButtonSelector=".t3js-create-new-button",v.createNewRecordBySelectorSelector=".t3js-create-new-selector",v.insertRecordButtonSelector=".t3js-insert-record-button",v.deleteRecordButtonSelector=".t3js-editform-delete-inline-record",v.enableDisableRecordButtonSelector=".t3js-toggle-visibility-button",v.infoWindowButton='[data-action="infowindow"]',v.synchronizeLocalizeRecordButtonSelector=".t3js-synchronizelocalize-button",v.uniqueValueSelectors="select.t3js-inline-unique",v.revertUniqueness=".t3js-revert-unique",v.controlContainerButtons=".t3js-inline-controls",(y=m||(m={})).new="inlineIsNewRecord",y.visible="panel-visible",y.collapsed="panel-collapsed",(b||(b={})).structureSeparator="-",(j=S||(S={})).DOWN="down",j.UP="up",function(){function e(e){var t=this;this.container=null,this.ajaxDispatcher=null,this.appearance=null,this.xhrQueue={},this.progessQueue={},this.noTitleString=TYPO3.lang?TYPO3.lang["FormEngine.noRecordTitle"]:"[No title]",this.handlePostMessage=function(e){if(!r.MessageUtility.verifyOrigin(e.origin))throw"Denied message sent by "+e.origin;if(void 0===e.data.objectGroup)throw"No object group defined for message";e.data.objectGroup===t.container.dataset.objectGroup&&(t.isUniqueElementUsed(parseInt(e.data.uid,10),e.data.table)?c.error("There is already a relation to the selected element"):t.importRecord([e.data.objectGroup,e.data.uid]))},o(function(){t.container=document.querySelector("#"+e),t.ajaxDispatcher=new n.AjaxDispatcher(t.container.dataset.objectGroup),t.registerEvents()})}return e.getDelegatedEventTarget=function(e,t){var n;return null===(n=e.closest(t))&&e.matches(t)&&(n=e),n},e.getInlineRecordContainer=function(e){return document.querySelector('[data-object-id="'+e+'"]')},e.registerInfoButton=function(t){var n;null!==(n=e.getDelegatedEventTarget(t.target,f.infoWindowButton))&&(t.preventDefault(),t.stopImmediatePropagation(),s.showItem(n.dataset.infoTable,n.dataset.infoUid))},e.registerInsertRecordButton=function(t){var n;if(null!==(n=e.getDelegatedEventTarget(t.target,f.insertRecordButtonSelector))){t.preventDefault(),t.stopImmediatePropagation();var r=n.dataset.mode,o=n.dataset.params;i.openPopupWindow(r,o)}},e.toggleElement=function(t){var n=e.getInlineRecordContainer(t);n.classList.contains(m.collapsed)?(n.classList.remove(m.collapsed),n.classList.add(m.visible)):(n.classList.remove(m.visible),n.classList.add(m.collapsed))},e.isNewRecord=function(t){return e.getInlineRecordContainer(t).classList.contains(m.new)},e.updateExpandedCollapsedStateLocally=function(t,n){var r=e.getInlineRecordContainer(t),o="uc[inlineView]["+r.dataset.topmostParentTable+"]["+r.dataset.topmostParentUid+"]"+r.dataset.fieldName,i=document.getElementsByName(o);i.length&&(i[0].value=n?"1":"0")},e.getValuesFromHashMap=function(e){return Object.keys(e).map(function(t){return e[t]})},e.removeSelectOptionByValue=function(e,t){var n=e.querySelector('option[value="'+t+'"]');null!==n&&n.remove()},e.reAddSelectOption=function(e,t,n){var r=Array.from(e.querySelectorAll("option")),o=-1;try{for(var i=__values(Object.keys(n.possible)),a=i.next();!a.done;a=i.next()){var l=a.value;if(l===t)break;for(var s=0;s<r.length;++s){if(r[s].value===l){o=s;break}}}}catch(e){d={error:e}}finally{try{a&&!a.done&&(c=i.return)&&c.call(i)}finally{if(d)throw d.error}}-1===o?o=0:o<r.length&&o++;var d,c,u=document.createElement("option");u.text=n.possible[t],u.value=t,e.insertBefore(u,e.options[o])},e.prototype.registerEvents=function(){var t=this;if(this.container.addEventListener("click",function(n){t.registerToggle(n),t.registerSort(n),t.registerCreateRecordButton(n),t.registerCreateRecordBySelector(n),e.registerInsertRecordButton(n),t.registerEnableDisableButton(n),e.registerInfoButton(n),t.registerDeleteButton(n),t.registerSynchronizeLocalize(n),t.registerUniqueSelectFieldChanged(n),t.registerRevertUniquenessAction(n)}),window.addEventListener("message",this.handlePostMessage),this.getAppearance().useSortable){var n=document.querySelector("#"+this.container.getAttribute("id")+"_records");new g(n,{group:n.getAttribute("id"),handle:".sortableHandle",onSort:function(){t.updateSorting()}})}},e.prototype.registerToggle=function(t){var n;e.getDelegatedEventTarget(t.target,f.controlSectionSelector)||null!==(n=e.getDelegatedEventTarget(t.target,f.toggleSelector))&&(t.preventDefault(),t.stopImmediatePropagation(),this.loadRecordDetails(n.parentElement.dataset.objectId))},e.prototype.registerSort=function(t){var n;null!==(n=e.getDelegatedEventTarget(t.target,f.controlSectionSelector+' [data-action="sort"]'))&&(t.preventDefault(),t.stopImmediatePropagation(),this.changeSortingByButton(n.closest("[data-object-id]").dataset.objectId,n.dataset.direction))},e.prototype.registerCreateRecordButton=function(t){var n;if(null!==(n=e.getDelegatedEventTarget(t.target,f.createNewRecordButtonSelector))&&(t.preventDefault(),t.stopImmediatePropagation(),this.isBelowMax())){var r=this.container.dataset.objectGroup;void 0!==n.dataset.recordUid&&(r+=b.structureSeparator+n.dataset.recordUid),this.importRecord([r],n.dataset.recordUid)}},e.prototype.registerCreateRecordBySelector=function(t){var n;if(null!==(n=e.getDelegatedEventTarget(t.target,f.createNewRecordBySelectorSelector))){t.preventDefault(),t.stopImmediatePropagation();var r=n,o=r.options[r.selectedIndex].getAttribute("value");this.importRecord([this.container.dataset.objectGroup,o])}},e.prototype.createRecord=function(t,n,r,o){void 0===r&&(r=null),void 0===o&&(o=null);var i=this.container.dataset.objectGroup;null!==r&&(i+=b.structureSeparator+r),null!==r?(e.getInlineRecordContainer(i).insertAdjacentHTML("afterend",n),this.memorizeAddRecord(t,r,o)):(document.querySelector("#"+this.container.getAttribute("id")+"_records").insertAdjacentHTML("beforeend",n),this.memorizeAddRecord(t,null,o))},e.prototype.importRecord=function(e,t){var n=this;this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_create")).withContext().withParams(e)).done(function(e){n.isBelowMax()&&(n.createRecord(e.compilerInput.uid,e.data,void 0!==t?t:null,void 0!==e.compilerInput.childChildUid?e.compilerInput.childChildUid:null),i.reinitialize(),i.Validation.initializeInputFields(),i.Validation.validate())})},e.prototype.registerEnableDisableButton=function(t){var n;if(null!==(n=e.getDelegatedEventTarget(t.target,f.enableDisableRecordButtonSelector))){t.preventDefault(),t.stopImmediatePropagation();var r=n.closest("[data-object-id]").dataset.objectId,o=e.getInlineRecordContainer(r),i="data"+o.dataset.fieldName+"["+n.dataset.hiddenField+"]",a=document.querySelector('[data-formengine-input-name="'+i+'"'),s=document.querySelector('[name="'+i+'"');null!==a&&null!==s&&(a.checked=!a.checked,s.value=a.checked?"1":"0",TBE_EDITOR.fieldChanged_fName(i,i));var d="t3-form-field-container-inline-hidden",c="";o.classList.contains(d)?(c="actions-edit-hide",o.classList.remove(d)):(c="actions-edit-unhide",o.classList.add(d)),l.getIcon(c,l.sizes.small).done(function(e){n.replaceChild(document.createRange().createContextualFragment(e),n.querySelector(".t3js-icon"))})}},e.prototype.registerDeleteButton=function(t){var n,r=this;if(null!==(n=e.getDelegatedEventTarget(t.target,f.deleteRecordButtonSelector))){t.preventDefault(),t.stopImmediatePropagation();var o=TYPO3.lang["label.confirm.delete_record.title"]||"Delete this record?",i=TYPO3.lang["label.confirm.delete_record.content"]||"Are you sure you want to delete this record?";d.confirm(o,i,p.warning,[{text:TYPO3.lang["buttons.confirm.delete_record.no"]||"Cancel",active:!0,btnClass:"btn-default",name:"no"},{text:TYPO3.lang["buttons.confirm.delete_record.yes"]||"Yes, delete this record",btnClass:"btn-warning",name:"yes"}]).on("button.clicked",function(e){if("yes"===e.target.name){var t=n.closest("[data-object-id]").dataset.objectId;r.deleteRecord(t)}d.dismiss()})}},e.prototype.registerSynchronizeLocalize=function(t){var n,r=this;null!==(n=e.getDelegatedEventTarget(t.target,f.synchronizeLocalizeRecordButtonSelector))&&this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_synchronizelocalize")).withContext().withParams([this.container.dataset.objectGroup,n.dataset.type])).done(function(t){document.querySelector("#"+r.container.getAttribute("id")+"_records").insertAdjacentHTML("beforeend",t.data);var n,o,i,a,l=r.container.dataset.objectGroup+b.structureSeparator;try{for(var s=__values(t.compilerInput.delete),d=s.next();!d.done;d=s.next()){var c=d.value;r.deleteRecord(l+c,!0)}}catch(e){n={error:e}}finally{try{d&&!d.done&&(o=s.return)&&o.call(s)}finally{if(n)throw n.error}}try{for(var u=__values(t.compilerInput.localize),p=u.next();!p.done;p=u.next()){var g=p.value;if(void 0!==g.remove){var h=e.getInlineRecordContainer(l+g.remove);h.parentElement.removeChild(h)}r.memorizeAddRecord(g.uid,null,g.selectedValue)}}catch(e){i={error:e}}finally{try{p&&!p.done&&(a=u.return)&&a.call(u)}finally{if(i)throw i.error}}})},e.prototype.registerUniqueSelectFieldChanged=function(t){var n;if(null!==(n=e.getDelegatedEventTarget(t.target,f.uniqueValueSelectors))){var r=n.closest("[data-object-id]");if(null!==r){var o=r.dataset.objectId,i=r.dataset.objectUid;this.handleChangedField(n,o);var a=this.getFormFieldForElements();if(null===a)return;this.updateUnique(n,a,i)}}},e.prototype.registerRevertUniquenessAction=function(t){var n;null!==(n=e.getDelegatedEventTarget(t.target,f.revertUniqueness))&&this.revertUnique(n.dataset.uid)},e.prototype.loadRecordDetails=function(t){var n=this,r=document.querySelector("#"+t+"_fields"),o=void 0!==this.xhrQueue[t];if(null!==r&&"\x3c!--notloaded--\x3e"!==r.innerHTML.substr(0,16))this.collapseExpandRecord(t);else{var a=this.getProgress(t);if(o)this.xhrQueue[t].abort(),delete this.xhrQueue[t],delete this.progessQueue[t],a.done();else{var l=this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_details")).withContext().withParams([t]));l.done(function(o){if(delete n.xhrQueue[t],delete n.progessQueue[t],r.innerHTML=o.data,n.collapseExpandRecord(t),a.done(),i.reinitialize(),i.Validation.initializeInputFields(),i.Validation.validate(),n.hasObjectGroupDefinedUniqueConstraints()){var l=e.getInlineRecordContainer(t);n.removeUsed(l)}}),this.xhrQueue[t]=l,a.start()}}},e.prototype.collapseExpandRecord=function(t){var n=e.getInlineRecordContainer(t),r=!0===this.getAppearance().expandSingle,o=n.classList.contains(m.collapsed),i=[],a=[];r&&o&&(i=this.collapseAllRecords(n.dataset.objectUid)),e.toggleElement(t),e.isNewRecord(t)?e.updateExpandedCollapsedStateLocally(t,o):o?a.push(n.dataset.objectUid):o||i.push(n.dataset.objectUid),this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_expandcollapse")).withContext().withParams([t,a.join(","),i.join(",")]))},e.prototype.memorizeAddRecord=function(e,t,n){void 0===t&&(t=null),void 0===n&&(n=null);var r=this.getFormFieldForElements();if(null!==r){var i=h.trimExplode(",",r.value);if(t){for(var a=[],l=0;l<i.length;l++)i[l].length&&a.push(i[l]),t===i[l]&&a.push(e);i=a}else i.push(e);r.value=i.join(","),r.classList.add("has-change"),o(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,i),this.hasObjectGroupDefinedUniqueConstraints()&&this.setUnique(e,n),this.isBelowMax()||this.toggleContainerControls(!1),TBE_EDITOR.fieldChanged_fName(r.name,r)}},e.prototype.memorizeRemoveRecord=function(e){var t=this.getFormFieldForElements();if(null===t)return[];var n=h.trimExplode(",",t.value),r=n.indexOf(e);return r>-1&&(delete n[r],t.value=n.join(","),t.classList.add("has-change"),o(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,n)),n},e.prototype.changeSortingByButton=function(t,n){var r=e.getInlineRecordContainer(t),o=r.dataset.objectUid,i=document.querySelector("#"+this.container.getAttribute("id")+"_records"),a=Array.from(i.children).map(function(e){return e.dataset.objectUid}),l=a.indexOf(o),s=!1;if(n===S.UP&&l>0?(a[l]=a[l-1],a[l-1]=o,s=!0):n===S.DOWN&&l<a.length-1&&(a[l]=a[l+1],a[l+1]=o,s=!0),s){var d=this.container.dataset.objectGroup+b.structureSeparator,c=n===S.UP?1:0;r.parentElement.insertBefore(e.getInlineRecordContainer(d+a[l-c]),e.getInlineRecordContainer(d+a[l+1-c])),this.updateSorting()}},e.prototype.updateSorting=function(){var e=this.getFormFieldForElements();if(null!==e){var t=document.querySelector("#"+this.container.getAttribute("id")+"_records"),n=Array.from(t.children).map(function(e){return e.dataset.objectUid});e.value=n.join(","),e.classList.add("has-change"),o(document).trigger("inline:sorting-changed"),o(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,n)}},e.prototype.deleteRecord=function(t,n){var r=this;void 0===n&&(n=!1);var o=e.getInlineRecordContainer(t),i=o.dataset.objectUid;if(o.classList.add("t3js-inline-record-deleted"),!e.isNewRecord(t)&&!n){var l=this.container.querySelector('[name="cmd'+o.dataset.fieldName+'[delete]"]');l.removeAttribute("disabled"),o.parentElement.insertAdjacentElement("afterbegin",l)}o.addEventListener("transitionend",function(){o.parentElement.removeChild(o),r.memorizeRemoveRecord(i)}),o.classList.add("form-irre-object--deleted"),this.isBelowMax()&&this.toggleContainerControls(!0),a.validate()},e.prototype.toggleContainerControls=function(e){var t=this.container.querySelector(f.controlContainerButtons);null!==t&&(t.style.display=e?"block":"none")},e.prototype.getProgress=function(e){var t,n="#"+e+"_header";return void 0!==this.progessQueue[e]?t=this.progessQueue[e]:((t=u).configure({parent:n,showSpinner:!1}),this.progessQueue[e]=t),t},e.prototype.collapseAllRecords=function(t){var n,r,o=this.getFormFieldForElements(),i=[];if(null!==o){var a=h.trimExplode(",",o.value);try{for(var l=__values(a),s=l.next();!s.done;s=l.next()){var d=s.value;if(d!==t){var c=this.container.dataset.objectGroup+b.structureSeparator+d,u=e.getInlineRecordContainer(c);u.classList.contains(m.visible)&&(u.classList.remove(m.visible),u.classList.add(m.collapsed),e.isNewRecord(c)?e.updateExpandedCollapsedStateLocally(c,!1):i.push(d))}}}catch(e){n={error:e}}finally{try{s&&!s.done&&(r=l.return)&&r.call(l)}finally{if(n)throw n.error}}}return i},e.prototype.getFormFieldForElements=function(){var e=document.getElementsByName(this.container.dataset.formField);return e.length>0?e[0]:null},e.prototype.redrawSortingButtons=function(e,t){if(void 0===t&&(t=[]),0===t.length){var n=this.getFormFieldForElements();null!==n&&(t=h.trimExplode(",",n.value))}0!==t.length&&t.forEach(function(n,r){var o="#"+e+b.structureSeparator+n+"_header",i=document.querySelector(o),a=i.querySelector('[data-action="sort"][data-direction="'+S.UP+'"]');if(null!==a){var s="actions-move-up";0===r?(a.classList.add("disabled"),s="empty-empty"):a.classList.remove("disabled"),l.getIcon(s,l.sizes.small).done(function(e){a.replaceChild(document.createRange().createContextualFragment(e),a.querySelector(".t3js-icon"))})}var d=i.querySelector('[data-action="sort"][data-direction="'+S.DOWN+'"]');if(null!==d){s="actions-move-down";r===t.length-1?(d.classList.add("disabled"),s="empty-empty"):d.classList.remove("disabled"),l.getIcon(s,l.sizes.small).done(function(e){d.replaceChild(document.createRange().createContextualFragment(e),d.querySelector(".t3js-icon"))})}})},e.prototype.isBelowMax=function(){var e=this.getFormFieldForElements();if(null===e)return!0;if(void 0!==TYPO3.settings.FormEngineInline.config[this.container.dataset.objectGroup]){if(h.trimExplode(",",e.value).length>=TYPO3.settings.FormEngineInline.config[this.container.dataset.objectGroup].max)return!1;if(this.hasObjectGroupDefinedUniqueConstraints()){var t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if(t.used.length>=t.max&&t.max>=0)return!1}}return!0},e.prototype.isUniqueElementUsed=function(t,n){if(!this.hasObjectGroupDefinedUniqueConstraints())return!1;var r=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],o=e.getValuesFromHashMap(r.used);if("select"===r.type&&-1!==o.indexOf(t))return!0;if("groupdb"===r.type)for(var i=o.length-1;i>=0;i--)if(o[i].table===n&&o[i].uid===t)return!0;return!1},e.prototype.removeUsed=function(t){if(this.hasObjectGroupDefinedUniqueConstraints()){var n=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if("select"===n.type){var r=t.querySelector('[name="data['+n.table+"]["+t.dataset.objectUid+"]["+n.field+']"]'),o=e.getValuesFromHashMap(n.used);if(null!==r)for(var i=r.options[r.selectedIndex].value,a=0;a<o.length;a++)o[a]!==i&&e.removeSelectOptionByValue(r,o[a])}}},e.prototype.setUnique=function(t,n){if(this.hasObjectGroupDefinedUniqueConstraints()){var r=document.querySelector("#"+this.container.dataset.objectGroup+"_selector"),o=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if("select"===o.type){if(!o.selector||-1!==o.max){var i=this.getFormFieldForElements(),a=this.container.dataset.objectGroup+b.structureSeparator+t,l=e.getInlineRecordContainer(a).querySelector('[name="data['+o.table+"]["+t+"]["+o.field+']"]'),s=e.getValuesFromHashMap(o.used);if(null!==r){if(null!==l){for(var d=0;d<s.length;d++)e.removeSelectOptionByValue(l,s[d]);o.selector||(n=l.options[0].value,l.options[0].selected=!0,this.updateUnique(l,i,t),this.handleChangedField(l,this.container.dataset.objectGroup+"["+t+"]"))}for(var c=0;c<s.length;c++)e.removeSelectOptionByValue(l,s[c]);void 0!==o.used.length&&(o.used={}),o.used[t]={table:o.elTable,uid:n}}if(null!==i&&n)for(var u=h.trimExplode(",",i.value),p=0;p<u.length;p++)null!==(l=document.querySelector('[name="data['+o.table+"]["+u[p]+"]["+o.field+']"]'))&&u[p]!==t&&e.removeSelectOptionByValue(l,n)}}else"groupdb"===o.type&&(o.used[t]={table:o.elTable,uid:n});"select"===o.selector&&n&&(e.removeSelectOptionByValue(r,n),o.used[t]={table:o.elTable,uid:n})}},e.prototype.updateUnique=function(t,n,r){if(this.hasObjectGroupDefinedUniqueConstraints()){var o=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],i=o.used[r];if("select"===o.selector){var a=document.querySelector("#"+this.container.dataset.objectGroup+"_selector");e.removeSelectOptionByValue(a,t.value),void 0!==i&&e.reAddSelectOption(a,i,o)}if((!o.selector||-1!==o.max)&&o&&null!==n){for(var l,s=h.trimExplode(",",n.value),d=0;d<s.length;d++)null!==(l=document.querySelector('[name="data['+o.table+"]["+s[d]+"]["+o.field+']"]'))&&l!==t&&(e.removeSelectOptionByValue(l,t.value),void 0!==i&&e.reAddSelectOption(l,i,o));o.used[r]=t.value}}},e.prototype.revertUnique=function(e){if(this.hasObjectGroupDefinedUniqueConstraints()){var t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];"groupdb"===t.type&&delete t.used[e]}},e.prototype.hasObjectGroupDefinedUniqueConstraints=function(){return void 0!==TYPO3.settings.FormEngineInline.unique&&void 0!==TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup]},e.prototype.handleChangedField=function(e,t){var n;n=e instanceof HTMLSelectElement?e.options[e.selectedIndex].text:e.value,document.querySelector("#"+t+"_label").textContent=n.length?n:this.noTitleString},e.prototype.getAppearance=function(){if(null===this.appearance&&(this.appearance={},"string"==typeof this.container.dataset.appearance))try{this.appearance=JSON.parse(this.container.dataset.appearance)}catch(e){console.error(e)}return this.appearance},e}()});