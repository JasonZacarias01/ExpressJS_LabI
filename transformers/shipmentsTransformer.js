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

const parseAddress = (address) => {
  const regex = /^(?:\s*(\d+)\s+)?(.*?)(?:\s*#\s*|(?:\s+))?(\d+)?$/;
  const match = address.match(regex);

    if (match) {
        return {
            number: match[1] || match[3] || null,
            street: match[2].trim()
        };
    } else {
        return null;
    }
};

const normalizeCountry = (country) => {
  const countryMap = {
      'MX': 'Mexico',
      'United States': 'United States',
      'Canada': 'Canada',
  };
  return countryMap[country] || country;
};

const normalizeState = (state) => {
  const stateMap = {
      'Yuc': 'Yucatan',
      'Ags': 'Aguascalientes',
      'TN': 'Tennessee',
      'WA': 'Washington',
      'ON': 'Ontario'
  };
  return stateMap[state] || state;
};

function normalizeAddress(address) {
  let normalized = address.toLowerCase();
  
  normalized = normalized.replace(/\bdrive\b/g, 'dr');
  normalized = normalized.replace(/\broad\b/g, 'rd');

  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  return normalized;
}

  const compareAddresses = (shippingAddress, billingAddress) => {
    const { street, number } = parseAddress(shippingAddress.address);

    return (
        normalizeAddress(street.trim().toLowerCase()) === normalizeAddress(billingAddress.street.trim().toLowerCase()) &&
        number === billingAddress.number &&
        shippingAddress.city.trim().toLowerCase() === billingAddress.city.trim().toLowerCase() &&
        normalizeState(shippingAddress.state) === normalizeState(billingAddress.state) &&
        normalizeCountry(shippingAddress.country) === normalizeCountry(billingAddress.country) &&
        shippingAddress.zip === billingAddress.zip
    );
};
  
  exports.findDifferences = (shipments, users) => {
    const mismatchedShipments = [];

    shipments.forEach(shipment => {
        const user = users.find(user => user.userId === shipment.userId);
        
        if (user && !compareAddresses(shipment.shipping_address, user.billing_address)) {
            mismatchedShipments.push({
                shipmentId: shipment.shipmentId,
                userId: shipment.userId,
                shippingAddress: shipment.shipping_address,
                billingAddress: user.billing_address
            });
        }
    });

    return {
        numberOfShipments: mismatchedShipments.length,
        shipments: mismatchedShipments
    };
  } 
  