import { useState } from 'react'
import styles from '../../styles/form.module.css'

const Form = () => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  const [costo, setCosto] = useState('')
  const [desc, setDesc] = useState(0)
  const [lista, setLista] = useState(75)
  const [contado, setContado] = useState(40)
  const [precios, setPrecios] = useState({ 
    precioCosto: '',
    precioLista: '',
    tresCuotas: '',
    cuatroCuotas: '',
    precioContado: ''
   })

  const obtenerPrecios = (e) => {
    e.preventDefault()
    const costoReal = costo - (costo / 100 * desc)
    const precioLista = costoReal + (costoReal / 100 * lista)
    const tresCuotas = precioLista / 3
    const cuatroCuotas = precioLista / 4
    const precioContado = costoReal + (costoReal / 100 * contado)
    setPrecios({
      precioCosto: formatter.format(costo.toFixed(2)),
      precioLista: formatter.format(precioLista.toFixed(2)),
      tresCuotas: formatter.format(tresCuotas.toFixed(2)),
      cuatroCuotas: formatter.format(cuatroCuotas.toFixed(2)),
      precioContado: formatter.format(precioContado.toFixed(2))
    })
  }

  return (
    <div className={styles.containerGeneral}>
    
    <form className={styles.form} onSubmit={obtenerPrecios}>
      <label>
        <span>Costo</span>
        <input type="number" onChange={(e) => setCosto(Number(e.target.value))} value={costo} id='costo' name='costo' />
      </label>
      <label>
        <span>Descuento</span>
        <input type='number' onChange={(e) => setDesc(Number(e.target.value))} value={desc} id='desc' name='desc' />
      </label>
      <label>
        <span>Porcentaje de lista</span>
        <input type='number' onChange={(e) => setLista(Number(e.target.value))} value={lista} id='lista' name='lista' />
      </label>
      <label>
        <span>Porcentaje de contado</span>
        <input type='number' onChange={(e) => setContado(Number(e.target.value))} value={contado} id='contado' name='contado' />
      </label>
      <div className={styles.buttonContainer}>
        <button>Calcular</button>
      </div>
    </form>

      <div className={styles.resultados}>
        <div>
          <p>Costo</p>
          <span>{precios.precioCosto}</span>
        </div>
        <div>
          <p>Precio de lista</p>
          <span>{precios.precioLista}</span>
        </div>
        <div>
          <p>En 3 cuotas</p>
          <span>{precios.tresCuotas}</span>
        </div>
        <div>
          <p>En 4 cuotas</p>
          <span>{precios.cuatroCuotas}</span>
        </div>
        <div>
          <p>Precio de contado</p>
          <span>{precios.precioContado}</span>
        </div>
      </div>
    </div>
  )
}

export default Form
