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

import type {SelectTree} from './SelectTree';
import {Tooltip} from 'bootstrap';
import {html, customElement, LitElement, TemplateResult} from 'lit-element';
import {lll} from 'TYPO3/CMS/Core/lit-helper';
import 'TYPO3/CMS/Backend/Element/IconElement';
import './SelectTree';

const toolbarComponentName: string = 'typo3-backend-form-selecttree-toolbar';

export class SelectTreeElement {
  private readonly recordField: HTMLInputElement = null;
  private readonly tree: SelectTree = null;

  constructor(treeWrapperId: string, treeRecordFieldId: string, callback: Function) {
    this.recordField = <HTMLInputElement>document.getElementById(treeRecordFieldId);
    const treeWrapper = <HTMLElement>document.getElementById(treeWrapperId);
    this.tree = document.createElement('typo3-backend-form-selecttree') as SelectTree;
    this.tree.classList.add('svg-tree-wrapper');
    this.tree.dispatch.on('nodeSelectedAfter.requestUpdate', () => { callback(); } );

    const settings = {
      dataUrl: this.generateRequestUrl(),
      readOnlyMode: parseInt(this.recordField.dataset.readOnly, 10) === 1,
      input: this.recordField,
      exclusiveNodesIdentifiers: this.recordField.dataset.treeExclusiveKeys,
      validation: JSON.parse(this.recordField.dataset.formengineValidationRules)[0],
      expandUpToLevel: this.recordField.dataset.treeExpandUpToLevel,
      unselectableElements: [] as Array<any>
    };
    this.tree.addEventListener('svg-tree:initialized', () => {
      const toolbarElement = document.createElement(toolbarComponentName) as TreeToolbar;
      toolbarElement.tree = this.tree;
      this.tree.prepend(toolbarElement);
    });
    this.tree.setup = settings;
    treeWrapper.append(this.tree);
    this.listenForVisibleTree();
  }

  /**
   * If the Select item is in an invisible tab, it needs to be rendered once the tab
   * becomes visible.
   */
  private listenForVisibleTree(): void {
    if (!this.tree.offsetParent) {
      // Search for the parents that are tab containers
      let idOfTabContainer = this.tree.closest('.tab-pane').getAttribute('id');
      if (idOfTabContainer) {
        let btn = document.querySelector('[aria-controls="' + idOfTabContainer + '"]');
        btn.addEventListener('shown.bs.tab', () => { this.tree.dispatchEvent(new Event('svg-tree:visible')); });
      }
    }
  }

  private generateRequestUrl(): string {
    const params = {
      tableName: this.recordField.dataset.tablename,
      fieldName: this.recordField.dataset.fieldname,
      uid: this.recordField.dataset.uid,
      recordTypeValue: this.recordField.dataset.recordtypevalue,
      dataStructureIdentifier: this.recordField.dataset.datastructureidentifier,
      flexFormSheetName: this.recordField.dataset.flexformsheetname,
      flexFormFieldName: this.recordField.dataset.flexformfieldname,
      flexFormContainerName: this.recordField.dataset.flexformcontainername,
      flexFormContainerIdentifier: this.recordField.dataset.flexformcontaineridentifier,
      flexFormContainerFieldName: this.recordField.dataset.flexformcontainerfieldname,
      flexFormSectionContainerIsNew: this.recordField.dataset.flexformsectioncontainerisnew,
      command: this.recordField.dataset.command,
    };
    return TYPO3.settings.ajaxUrls.record_tree_data + '&' + new URLSearchParams(params);
  }
}

@customElement(toolbarComponentName)
class TreeToolbar extends LitElement {
  public tree: SelectTree;
  private settings = {
    collapseAllBtn: 'collapse-all-btn',
    expandAllBtn: 'expand-all-btn',
    searchInput: 'search-input',
    toggleHideUnchecked: 'hide-unchecked-btn'
  };

  /**
   * State of the hide unchecked toggle button
   *
   * @type {boolean}
   */
  private hideUncheckedState: boolean = false;

  // disable shadow dom for now
  protected createRenderRoot(): HTMLElement | ShadowRoot {
    return this;
  }

  protected firstUpdated(): void {
    this.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl: HTMLElement) => new Tooltip(tooltipTriggerEl));
  }

  protected render(): TemplateResult {
    return html`
      <div class="tree-toolbar btn-toolbar">
        <div class="input-group">
          <span class="input-group-addon input-group-icon filter">
            <typo3-backend-icon identifier="actions-filter" size="small"></typo3-backend-icon>
          </span>
          <input type="text" class="form-control ${this.settings.searchInput}" placeholder="${lll('tcatree.findItem')}" @input="${(evt: InputEvent) => this.filter(evt)}">
        </div>
        <div class="btn-group">
          <button type="button" data-bs-toggle="tooltip" class="btn btn-default ${this.settings.expandAllBtn}" title="${lll('tcatree.expandAll')}" @click="${() => this.expandAll()}">
            <typo3-backend-icon identifier="apps-pagetree-category-expand-all" size="small"></typo3-backend-icon>
          </button>
          <button type="button" data-bs-toggle="tooltip" class="btn btn-default ${this.settings.collapseAllBtn}" title="${lll('tcatree.collapseAll')}" @click="${() => this.collapseAll()}">
            <typo3-backend-icon identifier="apps-pagetree-category-collapse-all" size="small"></typo3-backend-icon>
          </button>
          <button type="button" data-bs-toggle="tooltip" class="btn btn-default ${this.settings.toggleHideUnchecked}" title="${lll('tcatree.toggleHideUnchecked')}" @click="${() => this.toggleHideUnchecked()}">
            <typo3-backend-icon identifier="apps-pagetree-category-toggle-hide-checked" size="small"></typo3-backend-icon>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Collapse children of root node
   */
  private collapseAll() {
    this.tree.collapseAll();
  }

  /**
   * Expand all nodes
   */
  private expandAll() {
    this.tree.expandAll();
  }

  private filter(event: InputEvent): void {
    const inputEl = <HTMLInputElement>event.target;
    this.tree.filter(inputEl.value.trim());
  }

  /**
   * Show only checked items
   */
  private toggleHideUnchecked(): void {
    this.hideUncheckedState = !this.hideUncheckedState;
    if (this.hideUncheckedState) {
      this.tree.nodes.forEach((node: any) => {
        if (node.checked) {
          this.tree.showParents(node);
          node.expanded = true;
          node.hidden = false;
        } else {
          node.hidden = true;
          node.expanded = false;
        }
      });
    } else {
      this.tree.nodes.forEach((node: any) => node.hidden = false);
    }
    this.tree.prepareDataForVisibleNodes();
    this.tree.updateVisibleNodes();
  }
}
