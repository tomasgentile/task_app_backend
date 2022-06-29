import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptaks.com>',
        to: email,
        subject: 'UpTaks - Confirma tu cuenta',
        text: 'Comprueba tu cuenta en Uptask',
        html: `<p>Hola ${nombre}! Compruba tu cuenta en Uptask</p>
               <p>Tu cuenta ya esta casi lista, solo debes comrpobarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
               `      
      });
}


export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptaks.com>',
        to: email,
        subject: 'UpTaks - Restablece tu Password',
        text: 'Restablece tu Password',
        html: `<p>Hola ${nombre}! has solicitado reestablecer tu Password</p>
               <p>Sigue el siguiente enlace para generar un nuevo Password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>
                <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
               `      
      });
}