import os
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, User, Doctor, Administrator, Appointment, Availability, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from datetime import datetime  
# from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt  
from flask_jwt_extended import JWTManager, create_access_token,jwt_required,get_jwt_identity  
from datetime import timedelta

app=Flask(__name__)
api = Blueprint('api', __name__)  


CORS(app) 


#Encriptacion JWT---- 
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY_OWN', 'super-secret-key')
app.config["JWT_TOKEN_LOCATION"] = ["headers"]  


bcrypt = Bcrypt()  
jwt = JWTManager()  
jwt.init_app(app) 

# db = SQLAlchemy(app)

# Ruta de ejemplo
@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! This message comes from the backend. Check the network tab in your browser to see the GET request."
    }
    return jsonify(response_body), 200

# Endpoints para el modelo User
@api.route('/user', methods=['GET'])
def get_User():
    try:
        user = User.query.all()
        return jsonify([user.serialize() for user in user]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        # Validación de campos requeridos
        if not data.get('email') or not data.get('name') or not data.get('password'):
            return jsonify({'error': 'Email, password, and name are required.'}), 400
        
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409
        
        # Hash de la contraseña
        password_hash = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        
        # Crear nuevo usuario
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            password=password_hash
        )

        # Guardar usuario en la base de datos
        db.session.add(new_user)
        db.session.commit()

        # Datos a retornar (sin contraseña por seguridad)
        ok_to_share = {
            "id": new_user.user_id,
            "name": new_user.name,
            "email": new_user.email
        }

        return jsonify({"Usuario Creado": ok_to_share}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    

#Generador de Token Usuario  
@api.route('/logIn',methods=['POST']) 
def get_token_usuario(): 
    try:  
        name=request.json.get('name')
        email = request.json.get('email') 
        password = request.json.get('password')
     
        if not email or not password or  not name: 
            return jsonify({'error': 'Email,name, password are required'}), 400 

        login_user = User.query.filter_by(email=email).first() 

        if not login_user: 
            return jsonify({'error': 'Invalid email.'}), 404   
        
        password_from_db = login_user.password 

        true_o_false = bcrypt.check_password_hash(password_from_db, password)  

        if true_o_false: 
            expires = timedelta(days=1) 
            user_id = login_user.user_id 
            access_token = create_access_token(identity={'id': user_id, 'role':login_user.role}, expires_delta=expires)

            user_data= {
               "name": login_user.name,
               "email": login_user.email,
               "id": login_user.user_id,
               "role": login_user.role,
               "access_token": access_token
            } 
            return jsonify(user_data), 200  
        else: 
            return jsonify({"Error": "Contraseña incorrecta"}), 404

    except Exception as e: 
        return jsonify({'Error': 'El email proporcionado no corresponde a ninguno registrado: ' + str(e)}), 500   

@api.route('/current_user')
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    if not user: 
        return jsonify(msg='User not found'), 404
    return jsonify(user.serialize()), 200

#Ruta restringida por Token Usuario 
@api.route('/users2') 
@jwt_required() 
def show_users(): 
    current_user_id= get_jwt_identity() 
    if current_user_id: 
        users=User.query.all() 
        user_list=[] 
        for user in users: 
            user_dict={ 
                'id':user.user_id, 
                'email':user.email
            }
            user_list.append(user_dict) 
        return jsonify(user_list),200 
    else: 
        return{"Error":"Token invalido"},401

    


# Endpoints para el modelo Doctor
@api.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors = Doctor.query.all()
        return jsonify([doctor.serialize() for doctor in doctors]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/doctors', methods=['POST'])
def create_doctor():
    data = request.get_json()
    try:
        new_doctor = Doctor(
            name=data.get('name'),
            email=data.get('email'),
            specialty=data.get('specialty'),
            password=data.get('password')
        ) 
        if not new_doctor.email or not new_doctor.name: 
            return jsonify({'error':'Email,password and Name are requeired.'}),400 
        
        existing_doctor=Doctor.query.filter_by(email=new_doctor.email).first() 
        if existing_doctor: 
            return jsonify({'error':'Email.already exists.'}),409
        
        password_hash=bcrypt.generate_password_hash(new_doctor.password).decode('utf-8')  

        #Ensamblamos usuario nuevo 
        new_created_doctor= Doctor(email=new_doctor.email, password=password_hash, name=new_doctor.name,specialty=new_doctor.specialty)  
        
       
        db.session.add(new_created_doctor)
        db.session.commit() 
        
        ok_to_share={  
           "name": new_created_doctor.name, 
           "email":new_created_doctor.email,
           "id":new_created_doctor.doctor_id, 
           "specialty":new_created_doctor.specialty

          }
         
        return jsonify({"Doctor User Created":ok_to_share}), 201

        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    
    #Generador de Token DOCTOR 
@api.route('/logIn/doctor',methods=['POST']) 
def get_token_doctor(): 
    try: 
     name=request.json.get('name') 
     email= request.json.get('email') 
     password= request.json.get('password')
     
     if not email or not password or not name: 
         return jsonify({'error':'Email, Name and password are required'}),400 

     login_doctor = Doctor.query.filter_by(email=email).first()
     if not login_doctor:
        print(f"No se encontró el doctor con el email: {email}")

     if not login_doctor: 
         return jsonify({'error':'Invalid email.'}),404 
       
     password_from_db = login_doctor.password 
     true_o_false = bcrypt.check_password_hash(password_from_db, password)  

     if true_o_false: 
         expires=timedelta(days=1) 
         doctor_id=login_doctor.doctor_id 
         access_token = create_access_token(identity={'id': doctor_id, 'role':login_doctor.role}, expires_delta=expires) 
        
         doctor_data= {
               "name": login_doctor.name,
               "email": login_doctor.email,
               "id": login_doctor.doctor_id,
               "role": login_doctor.role,
               "access_token": access_token
            } 
           
         return jsonify(doctor_data), 200
     else: 
         return{"Error":"Contraseña incorrecta"},404

    except Exception as e: 
        return ({'Error':'El email proporcionado no corresponde a ninguno registrado:'+ str(e)}),500  
   
    #Ruta restringida por Token DOCTOR
@api.route('/doctors2') 
@jwt_required() 
def show_doctors(): 
    current_doctor_id= get_jwt_identity() 
    if current_doctor_id: 
        doctors=Doctor.query.all() 
        doctor_list=[] 
        for doctor in doctors: 
            doctor_dict={ 
                'id':doctor.doctor_id, 
                'email':doctor.email
            }
            doctor_list.append(doctor_dict) 
        return jsonify(doctor_list),200 
    else: 
        return{"Error":"Token invalido"},401 


@api.route('/administrators', methods=['GET'])
def get_administrators():
    try:
        administrators = Administrator.query.all()
        return jsonify([admin.serialize() for admin in administrators]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/admin', methods=['POST'])
def create_admin():
    data = request.get_json()
    try:
        new_admin = Administrator(
            name=data.get('name'),
            email=data.get('email'),
            password=data.get('password')
        ) 
        if not new_admin.email or not new_admin.name: 
            return jsonify({'error':'Email,password and Name are requeired.'}),400 
        
        existing_admin=Administrator.query.filter_by(email=new_admin.email).first() 
        if existing_admin: 
            return jsonify({'error':'Email.already exists.'}),409
        
        password_hash=bcrypt.generate_password_hash(new_admin.password).decode('utf-8')  

        #Ensamblamos usuario nuevo 
        new_created_admin= Administrator(email=new_admin.email, password=password_hash, name=new_admin.name)  
        
       
        db.session.add(new_created_admin)
        db.session.commit() 
        
        ok_to_share={  
           "name": new_created_admin.name, 
           "email":new_created_admin.email,
           "id":new_created_admin.admin_id

          }
         
        return jsonify({"Administrator User Created":ok_to_share}), 201
      
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400 
    

    #Generador de Token ADMIN
@api.route('/logIn/admin', methods=['POST']) 
def get_token_admin(): 
    try: 
        name = request.json.get('name')
        email = request.json.get('email') 
        password = request.json.get('password')
        
        if not email or not password or not name: 
            return jsonify({'error': 'Email, password, and name are required'}), 400 

        login_admin = Administrator.query.filter_by(email=email).first()

        if not login_admin: 
            return jsonify({'error': 'Invalid email.'}), 404   

        password_from_db = login_admin.password 
        true_o_false = bcrypt.check_password_hash(password_from_db, password)  

        if true_o_false: 
            expires = timedelta(days=1)
            admin_id = login_admin.admin_id  # Corregido
            access_token = create_access_token(identity={'id': admin_id, 'role': 'admin'}, expires_delta=expires)
            admin_data = {
                "name": login_admin.name,
                "email": login_admin.email,
                "id": login_admin.admin_id,
                "role": login_admin.role,
                "access_token": access_token  # Corregido
            }
            return jsonify(admin_data), 200  # Corregido
        else: 
            return jsonify({"error": "Contraseña incorrecta"}), 404

    except Exception as e: 
        return jsonify({'error': 'Ocurrió un error en el servidor: ' + str(e)}), 500    
#     #Ruta restringida por Token Admin
@api.route('/administrators2') 
@jwt_required() 
def show_administrador(): 
    current_admin_id= get_jwt_identity() 
    if current_admin_id: 
        admins=Administrator.query.all() 
        admin_list=[] 
        for admin in admins: 
            admin_dict={ 
                'id':admin.admin_id, 
                'email':admin.email
            }
            admin_list.append(admin_dict) 
        return jsonify(admin_list),200 
    else: 
        return{"Error":"Token invalido"},401 

# Endpoints para el modelo Post
@api.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        return jsonify([post.serialize() for post in posts]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    try:
        # Convertir la fecha de string a objeto date (formato 'YYYY-MM-DD')
        date_str = data.get('date')
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None

        new_post = Post(
            admin_id=data.get('admin_id'),
            date=date_obj,
            content=data.get('content')
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoints para el modelo Appointment
@api.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    current_user = get_jwt_identity()
    
    if current_user['role'] == 'Doctor':
        appointments = Appointment.query.filter_by(doctor_id=current_user['id']).all()
    else:
        appointments = Appointment.query.filter_by(user_id=current_user['id']).all()
    
    return jsonify([appointment.serialize() for appointment in appointments]), 200


@api.route('/appointments', methods=['POST'])

@jwt_required()

def create_appointment():
    print(request.headers)  # Verificar si el frontend está enviando el token
    data = request.get_json()
    current_user = get_jwt_identity()

    try:
        date_str = data.get('date')
        time_str = data.get('time')
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
        time_obj = datetime.strptime(time_str, '%H:%M:%S').time() if time_str else None

        # OJO el user_id se toma de current_user['id']no del JSON 
        new_appointment = Appointment(
            user_id=current_user['id'],
            doctor_id=data.get('doctor_id'),
            date=date_obj,
            time=time_obj,
            status=data.get('status')
        )
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify(new_appointment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
# Endpoints para el modelo Availability
@api.route('/availabilities', methods=['GET'])
def get_availabilities():
    try:
        availabilities = Availability.query.all()
        return jsonify([availability.serialize() for availability in availabilities]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
##############eliminar cita################
@api.route('/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
    current_user = get_jwt_identity()
    appointment = Appointment.query.get(appointment_id)
    if not appointment or appointment.user_id != current_user['id']:
        return jsonify({"error": "Cita no encontrada o acceso no autorizado"}), 404
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Cita eliminada correctamente"}), 200
##########editar cita############
@api.route('/appointments/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    current_user = get_jwt_identity()
    appointment = Appointment.query.get(appointment_id)
    if not appointment or appointment.user_id != current_user['id']:
        return jsonify({"error": "Cita no encontrada o acceso no autorizado"}), 404
    data = request.get_json()
    # Actualiza los campos necesarios, por ejemplo:
    if data.get("date"):
        appointment.date = datetime.strptime(data.get("date"), '%Y-%m-%d').date()
    if data.get("time"):
        appointment.time = datetime.strptime(data.get("time"), '%H:%M:%S').time()
    db.session.commit()
    return jsonify({"message": "Cita actualizada correctamente"}), 200


@api.route('/availabilities', methods=['POST'])
def create_availability():
    data = request.get_json()
    try:
        # Convertir start_time y end_time de string a objeto time (formato 'HH:MM:SS')
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')
        start_time_obj = datetime.strptime(start_time_str, '%H:%M:%S').time() if start_time_str else None
        end_time_obj = datetime.strptime(end_time_str, '%H:%M:%S').time() if end_time_str else None

        new_availability = Availability(
            doctor_id=data.get('doctor_id'),
            day=data.get('day'),
            start_time=start_time_obj,
            end_time=end_time_obj
        )
        db.session.add(new_availability)
        db.session.commit()
        return jsonify(new_availability.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


     
#Delete User 

@api.route('/delete_user/<int:user_id>', methods=['DELETE'])  
def delete_user(user_id): 
    user=User.query.get(user_id) 
    if not user: 
        return jsonify({"error":"Usuario no encontrado"}),404 
      
    db.session.delete(user)
    db.session.commit() 
    return jsonify({"message":'Usuario Borrado Correctamente', "user_id":user_id}),200 

#Delete Doctor 

@api.route('/delete_doctor/<int:doctor_id>', methods=['DELETE']) 
def delete_doctor(doctor_id):
    doctor=Doctor.query.get(doctor_id) 
    if doctor:  
        
        db.session.delete(doctor)
        db.session.commit() 
        return jsonify('Doctor Borrado'),200 
    return jsonify({"message":'Usuario Borrado Correctamente', "doctor_id":doctor_id}),404 


#Delete Admin for Admin 

@api.route('/delete_admin/<int:admin_id>', methods=['DELETE']) 
def delete_admin(admin_id):
    admin=Administrator.query.get(admin_id) 
    if admin: 
        
        db.session.delete(admin)
        db.session.commit() 
        return jsonify('Administrador Borrado'),200 
    return jsonify('no se encontro el Administrador'),404
   
#PUT para User por Admin
@api.route('/edit_user/<int:user_id>', methods=['PUT']) 
def edit_user(user_id): 
    user=User.query.get(user_id) 
    if not user: 
        return jsonify ({'error':'Usuario no encontrado'}),400 
    
    data=request.json
    if "name" in data: 
        user.name = data["name"] 
    if "email" in data: 
        user.email = data["email"] 
    if "password" in data:  
        password_hash = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        user.password = password_hash
   
    if not isinstance(data, dict):  
        return jsonify({"error": "Los datos deben ser un diccionario"}), 400
    try:
        db.session.commit()
        return jsonify({"message": "El usuario se actualizó correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#PUT para Doctor por Admin

@api.route('/edit_doctor/<int:doctor_id>', methods=['PUT']) 
def edit_doctor(doctor_id): 
    doctor=Doctor.query.get(doctor_id) 
    if not doctor: 
        return jsonify ({'error':'Usuario no encontrado'}),400 
    
    data=request.json
    if "name" in data: 
        doctor.name = data["name"] 
    if "email" in data: 
        doctor.email = data["email"] 
    if "password" in data:  
        password_hash = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        doctor.password = password_hash
   
    if not isinstance(data, dict):  
        return jsonify({"error": "Los datos deben ser un diccionario"}), 400
    try:
        db.session.commit()
        return jsonify({"message": "El usuario de Doctor se actualizó correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#PUT de Admin para Admin 
@api.route('/edit_admin/<int:admin_id>', methods=['PUT']) 
def edit_admin(admin_id): 
    admin=Administrator.query.get(admin_id) 
    if not admin: 
        return jsonify ({'error':'Usuario no encontrado'}),400 
    
    data = request.json  
    if "name" in data: 
        admin.name = data["name"] 
    if "email" in data: 
        admin.email = data["email"] 
    if "password" in data:  
        password_hash = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        admin.password = password_hash 
    
    if not isinstance(data, dict):  
        return jsonify({"error": "Los datos deben ser un diccionario"}), 400
    try:
        db.session.commit()
        return jsonify({"message": "El usuario de Admin se actualizó correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)  
