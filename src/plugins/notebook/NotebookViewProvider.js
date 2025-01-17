/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2023, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

import Notebook from './components/Notebook.vue';
import Agent from '@/utils/agent/Agent';
import mount from 'utils/mount';

export default class NotebookViewProvider {
  constructor(openmct, name, key, type, cssClass, snapshotContainer, entryUrlWhitelist) {
    this.openmct = openmct;
    this.key = key;
    this.name = `${name} View`;
    this.type = type;
    this.cssClass = cssClass;
    this.snapshotContainer = snapshotContainer;
    this.entryUrlWhitelist = entryUrlWhitelist;
  }

  canView(domainObject) {
    return domainObject.type === this.type;
  }

  view(domainObject) {
    let openmct = this.openmct;
    let snapshotContainer = this.snapshotContainer;
    let agent = new Agent(window);
    let entryUrlWhitelist = this.entryUrlWhitelist;
    let _destroy = null;

    return {
      show(container) {
        const { destroy } = mount(
          {
            el: container,
            components: {
              Notebook
            },
            provide: {
              openmct,
              snapshotContainer,
              agent,
              entryUrlWhitelist
            },
            data() {
              return {
                domainObject
              };
            },
            template: '<Notebook :domain-object="domainObject"></Notebook>'
          },
          {
            app: openmct.app,
            element: container
          }
        );
        _destroy = destroy;
      },
      destroy() {
        if (_destroy) {
          _destroy();
        }
      }
    };
  }
}
