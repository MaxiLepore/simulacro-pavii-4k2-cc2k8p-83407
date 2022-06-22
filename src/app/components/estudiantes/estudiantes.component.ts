import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Barrio } from '../../models/barrio';
import { Estudiante } from '../../models/estudiante';
import { BarrioService } from '../../services/barrio.service';
import { EstudianteService } from '../../services/estudiante.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  Mostrar: string = 'L';
  Items: Estudiante[] = [];
  ItemsBarrios: Barrio[] = [];
  OpcionesRegular = [
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];
  FormAlta = new FormGroup({
    EstudianteAyN: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    EstudianteLegajo: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{5}'),
    ]),
    EstudianteFechaNac: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
    EstudianteRegular: new FormControl(true, [Validators.required]),
    BarrioID: new FormControl('', [Validators.required]),
  });

  constructor(
    private estudianteService: EstudianteService,
    private barrioService: BarrioService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.getEstudiantes();
    this.getBarrios();
  }

  getEstudiantes() {
    this.estudianteService.get().subscribe((res: Estudiante[]) => {
      this.Items = res;
    });
  }
  getBarrios() {
    this.barrioService.get().subscribe((res: Barrio[]) => {
      this.ItemsBarrios = res;
      console.log(this.ItemsBarrios);
    });
  }

  mostrarListado() {
    this.Mostrar = 'L';
    this.FormAlta.reset();
    this.getEstudiantes();
  }

  mostrarAlta() {
    this.Mostrar = 'A';
  }

  getNombreBarrioById(id) {
    var Nombre = this.ItemsBarrios.find((x) => x.BarrioID === id)?.BarrioNombre;
    return Nombre;
  }

  grabarEstudiante() {
    const itemCopy = { ...this.FormAlta.value };
    var fechaArray = itemCopy.EstudianteFechaNac.substr(0, 10).split('/');
    itemCopy.EstudianteFechaNac = new Date(
      fechaArray[2],
      fechaArray[1] - 1,
      fechaArray[0]
    ).toISOString();
    this.estudianteService.post(itemCopy).subscribe((res: any) => {
      this.modalDialogService.Alert('Estudiante agregado correctamente');
      this.mostrarListado();
    });
  }
}
