import {Component, HostListener, inject, Input, OnDestroy, OnInit, Signal, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {CrudService} from '../../../services/crud.service';
import {PolyType, RelationalResult} from '../../../components/data-view/models/result-set.model';
import {ToasterService} from '../../../components/toast-exposer/toaster.service';
import {DbmsTypesService} from '../../../services/dbms-types.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {
    AllocationEntityModel,
    AllocationPartitionModel,
    AllocationPlacementModel,
    NamespaceModel,
    TableModel
} from '../../../models/catalog.model';
import {Method} from '../../../models/ui-request.model';
import {AdapterModel} from '../../adapters/adapter.model';

@Component({
    selector: 'app-graph-edit',
    templateUrl: './graph-edit-graph.component.html',
    styleUrls: ['./graph-edit-graph.component.scss']
})

export class GraphEditGraphComponent implements OnInit, OnDestroy {

    public readonly _crud = inject(CrudService);
    public readonly _types = inject(DbmsTypesService);
    private readonly _toast = inject(ToasterService);

    constructor() {

    }

    @Input()
    readonly entity: Signal<TableModel>;
    @Input()
    readonly namespace: Signal<NamespaceModel>;
    @Input()
    readonly currentRoute: Signal<string>;

    @Input()
    readonly placements: Signal<AllocationPlacementModel[]>;
    @Input()
    readonly partitions: Signal<AllocationPartitionModel[]>;
    @Input()
    readonly allocations: Signal<AllocationEntityModel[]>;
    @Input()
    readonly stores: Signal<AdapterModel[]>;
    @Input()
    readonly addableStores: Signal<AdapterModel[]>;

    types: PolyType[] = [];
    editColumn = -1;
    confirm = -1;


    //data placement handling
    selectedStore: AdapterModel;
    isAddingPlacement = false;


    subscriptions = new Subscription();

    @ViewChild('placementModal', {static: false}) public placementModal: ModalDirective;
    @ViewChild('partitioningModal', {static: false}) public partitioningModal: ModalDirective;
    @ViewChild('partitionFunctionModal', {static: false}) public partitionFunctionModal: ModalDirective;

    protected readonly Method = Method;

    ngOnInit() {
    }

    ngOnDestroy() {
        $(document).off('click');
        this.subscriptions.unsubscribe();
    }

    //see https://medium.com/claritydesignsystem/1b66d45b3e3d
    @HostListener('window:click', ['$event.target'])
    onClick(targetElement: string) {
        const self = this;
        if ($(targetElement).parents('.editing').length === 0) {
            self.editColumn = -1;
        }
    }


    modifyPlacement(method: Method, store = null) {
        if (store != null) {
            this.selectedStore = store;
        }
        if (!this.selectedStore) {
            return;
        }
        this.isAddingPlacement = true;
        this._crud.addDropGraphPlacement(this.entity().name, this.selectedStore.id, method).subscribe(res => {
            const result = <RelationalResult>res;
            if (result.error) {
                this._toast.exception(result);
                return;
            }
            if (method === Method.ADD) {
                this._toast.success('Added placement on store ' + this.selectedStore.name, result.query, 'Added placement');
            } else if (method === Method.DROP) {
                this._toast.success('Dropped placement on store ' + this.selectedStore.name, result.query, 'Dropped placement');
            }
            //this._catalog.updateIfNecessary();

        }).add(() => {
            this.isAddingPlacement = false;
        });
    }


    validate(defaultValue) {
        if (defaultValue === null) {
            return '';
        } else if (isNaN(defaultValue) || defaultValue === '') {
            return 'is-invalid';
        } else {
            return 'is-valid';
        }
    }

}
