import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TutorService } from 'src/app/services/tutor.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-clase-view',
  templateUrl: './clase-view.component.html',
  styleUrls: ['./clase-view.component.css']
})
export class ClaseViewComponent {

  arrAlumnos: User[]
  token: any;
  alumnos: any[];
  classId: any;
  AllAlumnos: any[] = [];

  constructor(
    private tutorService: TutorService,
    private activatedRoute: ActivatedRoute,
    private utilSV: UtilsService,
    private alumnoSV: AlumnoService,
    private claseSV: ClaseService
  ) {
    this.arrAlumnos = [],
      this.token = this.utilSV.getToken(),
      this.alumnos = [],
      this.classId = 0
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.classId = params.id
      console.log('PARAMETROSSSS', params);
      //Recoge datos de todos los alumnos
      const res = await this.claseSV.getClaseByClaseId(this.classId);
      console.log('ALUMNOS CON CLASE IDDDDDD', res);
      this.alumnos = res
      console.log('Alumno', this.alumnos)

      const resAll = await this.alumnoSV.getAlumnosByClaseId(this.classId);
      this.arrAlumnos = resAll;
      console.log('ALL ALUMNOS', resAll);

      const all = await this.alumnoSV.getAllAlumnosFromUsuarios();
      this.AllAlumnos = all;

      localStorage.setItem('claseId', this.classId);

    })
    console.log(this.arrAlumnos);

  }
  async getDataFrom(pValue: any) {
    console.log('PValueeeee', pValue.value)
    const bodyForm = {
      alumno_id: pValue.value.alumnoId,
      clases_id: this.classId
    }
    await this.alumnoSV.insertAlumnoByClassID(bodyForm);
    console.log('FOOORRMM', bodyForm);
  }

  //Borrar alumno
  async deleteAlumno(idAlumno: any) {
    console.log(idAlumno)
    await this.alumnoSV.deleteAlumnoByID(idAlumno)
  }


}
