# Configuración de Webpay

Este proyecto incluye una integración con Webpay de Transbank para procesar pagos.

## ⚠️ IMPORTANTE - Seguridad

**La integración actual es una simulación para desarrollo.** En producción, **NUNCA** debes hacer llamadas directas a la API de Webpay desde el frontend. Todas las operaciones deben realizarse desde tu backend por seguridad.

## Configuración para Producción

### 1. Backend Requerido

Necesitas crear un backend que maneje:
- Creación de transacciones (`createTransaction`)
- Confirmación de transacciones (`commitTransaction`)
- Manejo seguro de credenciales

### 2. Credenciales de Webpay

Obtén tus credenciales desde el [Portal de Transbank](https://www.transbank.cl):
- API Key ID
- Commerce Code
- Secret Key (solo en backend)

### 3. Variables de Entorno

En tu backend, configura:

```env
WEBPAY_API_KEY_ID=tu_api_key_id
WEBPAY_COMMERCE_CODE=tu_commerce_code
WEBPAY_SECRET_KEY=tu_secret_key
WEBPAY_ENVIRONMENT=PRODUCTION
WEBPAY_RETURN_URL=https://tudominio.com/webpay/return
WEBPAY_FINAL_URL=https://tudominio.com/webpay/final
```

### 4. Modificar el Servicio

Actualiza `src/services/webpayService.js` para que haga llamadas a tu backend:

```javascript
export async function createTransaction(orderData) {
    const response = await fetch('/api/webpay/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    });
    
    return await response.json();
}
```

### 5. Redirección Real a Webpay

En producción, después de crear la transacción, redirige al usuario:

```javascript
if (result.success) {
    // Redirigir al formulario de Webpay
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = result.url;
    
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = result.token;
    
    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();
}
```

## Ambiente de Pruebas (Sandbox)

Para probar en desarrollo, usa el ambiente de integración de Transbank:
- URL: `https://webpay3gint.transbank.cl`
- Credenciales de prueba disponibles en la [documentación oficial](https://www.transbankdevelopers.cl/documentacion/como_empezar#ambiente-de-integracion)

## Documentación Oficial

- [Documentación Webpay](https://www.transbankdevelopers.cl/documentacion/webpay)
- [SDK de Transbank](https://github.com/TransbankDevelopers/transbank-sdk-php)
- [Ambiente de Integración](https://www.transbankdevelopers.cl/documentacion/como_empezar#ambiente-de-integracion)

## Flujo de Pago

1. Usuario hace clic en "Pagar con Webpay"
2. Se crea una transacción en Webpay (desde backend)
3. Usuario es redirigido a Webpay para ingresar datos de tarjeta
4. Webpay redirige de vuelta a `returnUrl` con `token_ws`
5. Se confirma la transacción (desde backend)
6. Se muestra confirmación al usuario

## Notas de Seguridad

- ✅ Nunca expongas credenciales en el frontend
- ✅ Valida todas las transacciones en el backend
- ✅ Usa HTTPS en producción
- ✅ Implementa logs de transacciones
- ✅ Maneja errores apropiadamente
- ✅ Valida montos antes de confirmar

