from flask import Flask, render_template, request, flash, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from datetime import datetime
from urllib.parse import quote
from dotenv import load_dotenv
import os

app = Flask(__name__)

app.secret_key = 'Bj8hermanas8.'

# Datos de las quinceañeras
QUINCEANERAS = [
    {
        'nombre': 'Camila Ailen',
        'edad': 14,
        'descripcion': 'Describete',
        'color': '#65D0EE',  
        'foto': 'camilaAilen.jpg'
    },
    {
        'nombre': 'Jimena Arleth',
        'edad': 14,
        'descripcion': 'Describete',
        'color': '#65D0EE',  
        'foto': 'jimenaArleth.jpg'
    }
]

# Datos de los eventos
EVENTO_MISA = {
    'fecha': '22 de Agosto, 2026',
    'hora': '01:00 PM',
    'lugar': 'Parroquia de San Pascual Bailon',
    'direccion': 'San Pascual, 58337 Morelia, Mich.',
    'url_maps': 'https://maps.app.goo.gl/376rZW1mVxkXQ9Rx5'
}

EVENTO_FIESTA = {
    'fecha': '22 de Agosto, 2026',
    'hora': '04:30 PM',
    'lugar': 'Quinta RL Eventos',
    'direccion': 'Av Francisco I. Madero Pte 12812, San José Itzícuaro, 58336 San José Itzícuaro, Mich.',
    'url_maps': 'https://maps.app.goo.gl/L2vFTeAB2nYh7uz1A'
}

class ConfirmacionForm(FlaskForm):
    nombre = StringField('Tu nombre', validators=[DataRequired(message='Por favor, ingresa tu nombre.')])
    comentarios = TextAreaField('Comentarios')
    asistira = BooleanField('Confirmo mi asistencia', validators=[DataRequired(message='Por favor, confirma tu asistencia.')])
    submit = SubmitField('Enviar confirmación')

@app.route('/', methods=['GET', 'POST'])
def index():
    form = ConfirmacionForm()
    
    if form.validate_on_submit():
        # Construir mensaje de WhatsApp
        tu_numero = "524433589329"  # CAMBIAR NUMERO
    
        mensaje = f"Hola soy {form.nombre.data}"
    
        if form.comentarios.data:
            mensaje += f". Comentarios: {form.comentarios.data}"
    
        mensaje += ". Confirmo mi asistencia."
    
        # Codificar y enviar a WhatsApp
        mensaje_codificado = quote(mensaje)
        enlace_whatsapp = f"https://wa.me/{tu_numero}?text={mensaje_codificado}"
    
        flash('¡Gracias por confirmar tu asistencia! Te esperamos para celebrar juntos.', 'success')
        return redirect(enlace_whatsapp)
    
    # Cuenta regresiva
    fecha_evento = datetime(2026, 6, 15, 19, 0, 0)
    dias_restantes = (fecha_evento - datetime.now()).days
    
    return render_template('index.html', 
                         quinceaneras=QUINCEANERAS, 
                         evento_misa=EVENTO_MISA,
                         evento_fiesta=EVENTO_FIESTA,
                         form=form,
                         dias_restantes=dias_restantes)

@app.route('/galeria')
def galeria():
    """Ruta para la galería de fotos"""
    return render_template('galeria.html')

if __name__ == '__main__':
    app.run(debug=True)