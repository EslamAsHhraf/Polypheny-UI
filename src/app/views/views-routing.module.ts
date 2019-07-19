import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UmlComponent} from './uml/uml.component';
import {SqlConsoleComponent} from './sql-console/sql-console.component';
import {GraphicalQueryingComponent} from './graphical-querying/graphical-querying.component';
import {FormGeneratorComponent} from './forms/form-generator/form-generator.component';
import {TableViewComponent} from './table-view/table-view.component';
import {SchemaEditingComponent} from './schema-editing/schema-editing.component';
import {MonitoringComponent} from './monitoring/monitoring.component';

const routes: Routes = [
  {
    path: 'monitoring',
    component: MonitoringComponent,
    data: {
      title: 'Monitoring'
    }
  },
  {
    path: 'monitoring/:id',
    component: MonitoringComponent,
    data: {
      title: 'Monitoring'
    }
  },
  {
    path: 'uml',
    redirectTo: 'uml/',
    pathMatch: 'full'
  },
  {
    path: 'uml/:id',
    component: UmlComponent,
    data: {
      title: 'UML'
    }
  },
  {
    path: 'sql-console',
    component: SqlConsoleComponent,
    data: {
      title: 'SQL Console'
    }
  },
  {
    path: 'data-table',
    redirectTo: 'data-table/',
    pathMatch: 'full'
  },
  {
    path: 'data-table/:id',
    component: TableViewComponent,
    data: {
      title: 'Data Table'
    }
  },
  {
    path: 'data-table/:id/:page',
    component: TableViewComponent,
    data: {
      title: 'Data Table'
    }
  },
  {
    path: 'schema-editing',
    redirectTo: 'schema-editing/',
    pathMatch: 'full'
  },
  {
    path: 'schema-editing/:id',
    component: SchemaEditingComponent,
    data: {
      title: 'Schema Editing'
    }
  },
  {
    path: 'graphical-querying',
    component: GraphicalQueryingComponent,
    data: {
      title: 'Graphical Querying'
    }
  },
  {
    path: 'config',
    component: FormGeneratorComponent,
    data: {
      title: 'Form Generator'
    }
  },
  {
    path: 'config/:page',
    component: FormGeneratorComponent,
    data: {
      title: 'Form Generator'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
