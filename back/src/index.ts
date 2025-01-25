// import app from './app';

// app.listen(app.get('port'), () => {
//   console.log("Servidor iniciado en", app.get('port'));
// });

import * as functions from 'firebase-functions';
import app from './app';

export const api = functions.https.onRequest(app);
