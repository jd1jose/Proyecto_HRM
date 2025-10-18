import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-antecedentes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {

@Input() form!: FormGroup;

  listaCampos = [
    { name: 'deshonestidad', label: 'Ha sido acusado alguna vez de deshonestidad en cualquiera de sus empleos' },
    { name: 'mentidoEmpleo', label: 'Ha mentido para obtener un empleo' },
    { name: 'beneficioIlicito', label: 'Ha usado su puesto o sus funciones para obtener beneficios en forma ilícita' },
    { name: 'usoIndebidoInfo', label: 'Ha hecho uso indebido de información confidencial de la empresa' },
    { name: 'usoSuministros', label: 'Ha utilizado los suministros de la empresa para uso personal' },
    { name: 'problemasLaborales', label: 'Se ha visto involucrado en problema laboral serios' },
    { name: 'discusionesSuperiores', label: 'Ha tenido discusiones serias con superiores' },
    { name: 'actaAdministrativa', label: 'Se ha levantado algún acta administrativa o proceso laboral en su contra' },
    { name: 'sobornos', label: 'Ha aceptado sobornos de cualquier tipo' },
    { name: 'conoceDelincuentes', label: 'Conoce a alguien que cometa actos delictivos cercano a usted' },
    { name: 'miembroSindicato', label: 'Ha sido miembro de algún grupo civil, asociación o sindicato' },
    { name: 'asociadoGrupos', label: 'Ha estado asociado con delincuentes o ha sido miembro de grupos delictivos' },
    { name: 'beneficiadoIlicito', label: 'Conoce a alguien que se haya beneficiado ilícitamente en su trabajo' },
    { name: 'amistadGrupos', label: 'Tiene amistad cercana o familiar que pertenezcan a grupos delictivos' },
    { name: 'amistadAntecedentes', label: 'Tiene amistad cercana o familiar que posean antecedentes delictivos' },
    { name: 'familiaProblemasLegales', label: 'Algún miembro de su familia ha tenido problemas legales' },
    { name: 'efectivoCargo', label: 'Ha tenido la responsabilidad de efectivo a su cargo' },
    { name: 'sobrantesFaltantes', label: 'Ha presentado sobrantes o faltantes' },
    { name: 'autoPrestamos', label: 'Ha realizado auto préstamos' },
    { name: 'jineteoEfectivo', label: 'Ha jineteado efectivo' },
    { name: 'familiarDetenido', label: 'Algún familiar ha estado detenido en reclusorios o cárceles' },
    { name: 'cargosCometida', label: 'Ha tenido cargos por cualquier falta cometida' },
    { name: 'ayudadoIlicito', label: 'Ha ayudado a alguien a cometer algún acto ilícito' },
    { name: 'ocultaInfo', label: 'Oculta alguna información que de saberse, ¿le perjudicaría en este proceso?' },
    { name: 'actividadIlicita', label: 'Ha estado involucrado en alguna actividad ilícita en años anteriores' },
    { name: 'mintioInformacion', label: 'Mintió usted en la información proporcionada en este proceso' },
    { name: 'roboSuperior100', label: 'Ha robado objeto con valor superior a Q.100.00' },
    { name: 'tomadoProductos', label: 'Ha tomado efectivo o productos de trabajos anteriores' },
    { name: 'regalosValor', label: 'Ha recibido regalos de un distribuidor o cliente a cambio de información' },
    { name: 'despedidoRobo', label: 'Ha sido despedido de un lugar de trabajo por robo' },
    { name: 'conoceDroga', label: 'Conoce la droga físicamente' },
    { name: 'consumeDrogas', label: 'Consume drogas, fármacos o algún tipo de alucinógeno' },
    { name: 'vidaDrogas', label: 'Durante su vida ha consumido algún tipo de droga' },
    { name: 'trabajoDrogas', label: 'Usa drogas durante su tiempo de trabajo' },
    { name: 'divulgaInfo', label: 'Ha divulgado información de algún jefe con terceros' },
    { name: 'tarjetaCredito', label: 'Ha utilizado ilegalmente alguna tarjeta de crédito o cuenta bancaria' },
    { name: 'falsificadoDocumentos', label: 'Ha falsificado o alterado documentos o firmas' },
    { name: 'fraudeExtorsion', label: 'Ha cometido fraude, extorsión o chantaje' },
    { name: 'actoInmoral', label: 'Ha participado en algún acto inmoral dentro de la empresa' },
    { name: 'relacionLaboral', label: 'Tiene o ha tenido relación sentimental con algún compañero de trabajo' },
    { name: 'tramitesNoAutorizados', label: 'Ha realizado trámites particulares en horas de trabajo sin autorización' },
    { name: 'problemasPersonales', label: 'Alguna vez ha tenido problemas personales o laborales' },
    { name: 'atentadoVidaPropia', label: 'Ha intentado atentar contra su vida' },
    { name: 'atentadoVidaOtros', label: 'Ha intentado atentar contra la vida de sus semejantes' },
    { name: 'ebriedadTrabajo', label: 'Alguna vez se ha presentado ebrio o con resaca al trabajo' },
    { name: 'estupefacientesTrabajo', label: 'Alguna vez se ha presentado bajo estímulos de estupefacientes en el trabajo' },
    { name: 'deudasEconomicas', label: 'Tiene alguna deuda económica' }
  ];

  ngOnInit(): void {
    this.listaCampos.forEach(campo => {
      if (!this.form.get(campo.name)) this.form.addControl(campo.name, this.fb.control(''));
    });
  }

  constructor(private fb: FormBuilder) {}

}
