exports.calcularDiferenciaEnDias = (fechaFutura) => {
    const [dia, mes, anio] = fechaFutura.split('/').map(Number);
    const fechaFuturaDate = new Date(anio, mes - 1, dia);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const diferenciaMs = fechaFuturaDate - hoy;

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = Math.floor(diferenciaMs / milisegundosPorDia);

    const positiveNumber = Math.abs(diferenciaDias);
    const addedText = numero => 
        numero > 0 ? " days." :
        numero < 0 ? " days ago." :
        " today.";
    return `${positiveNumber} ${addedText(diferenciaDias)}`
  };

  exports.trasnformData = (filteredData) => {
    return filteredData.map(envio => {
        const daysCount = this.calcularDiferenciaEnDias(envio.shipping_date);
        return {...envio, deliveredInDays: daysCount}
    });
  } 
  
  