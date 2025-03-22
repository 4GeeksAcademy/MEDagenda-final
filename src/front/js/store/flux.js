const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			users: [],
			doctors: [],
			admins: [],
			user: null,
			token: localStorage.getItem('token') || null,
			doctor: null,
			admin: null,
			events: [],
			eventDoc: [],
			availabilities: [],
			role: localStorage.getItem("role") || null, // Obtener el rol almacenado
			preferenceId: null,

		},
		actions: {

			setPreferenceId: (id) => {
				setStore({ preferenceId: id });  // ✅ Guarda el ID en Flux
			},

			createPreference: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				if (!baseURL) {
					console.error("❌ ERROR: REACT_APP_BASE_URL no está definido.");
					return null;
				}

				try {
					console.log("🔹 Enviando solicitud a:", `${baseURL}api/create_preference`);

					const response = await fetch(`${baseURL}api/create_preference`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							title: "Consulta medica",
							quantity: 1,
							price: 50,
						}),
					});

					if (!response.ok) {
						const errorText = await response.text();
						throw new Error(`Error en la API: ${errorText}`);
					}

					const data = await response.json();
					console.log("✅ Preferencia creada:", data);

					// Guardar el ID de la preferencia en el store
					let store = getStore();
					setStore({ ...store, preferenceId: data.id });

					return data.id;
				} catch (error) {
					console.error("❌ Error en createPreference:", error.message);
					return null;
				}
			},




			setRole: (newRole) => {
				let store = getStore();
				setStore({ ...store, role: newRole });
				localStorage.setItem("role", newRole); // Guardar en localStorage
			},



			fetchAppointments: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				const token = getStore().token;
				console.log("baseURL", baseURL)
				console.log("token", token) 
				
				try {
					const response = await fetch(`${baseURL}api/appointments`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					if (!response.ok) {
						const errorData = response.json();
						console.log("Error", errorData)
						throw new Error("Error al cargar citas");
					}
					const data = await response.json();
					console.log("data entrante", data)
					const calendarEvents = data.map((appointment) => ({
						id: appointment.appointment_id,
						title: `Cita ${appointment.doctor_name ? `con Dr. ${appointment.doctor_name}` : ''}`,
						date: appointment.date,
						extendedProps: {
							status: appointment.status,
							time: appointment.time
						}
					}));
					let store = getStore();
					setStore({ ...store, events: calendarEvents });

					localStorage.setItem("appointments", JSON.stringify(calendarEvents));
				} catch (error) {
					console.error("Error en fetchAppointments:", error);
				}
			},
			fetchAppointments2: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				const token = getStore().token;
				console.log("baseURL", baseURL)
				console.log("token", token) 
				
				try {
					const response = await fetch(`${baseURL}api/appointments`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`, 
							"Content-Type": "application/json" 
						},
					});
					if (!response.ok) {
						const errorData = await response.json();
						console.log("Error", errorData)
						throw new Error("Error al cargar citas");
					}
					const data = await response.json();
					console.log("DATA ENTRANTE ES ESTE", data)
					const calendarEvents = data.map((appointment) => ({
						id: appointment.appointment_id,
						title: `Cita ${appointment.user_name ? `con Paciente. ${appointment.user_name}` : ''}`,
						date: appointment.date,
						extendedProps: {
							status: appointment.status,
							time: appointment.time
						}
					})); 
					console.log("Calendar Events",calendarEvents)
					
					let store = getStore();
					setStore({ ...store, events: calendarEvents });

					localStorage.setItem("appointments", JSON.stringify(calendarEvents));
				} catch (error) {
					console.error("Error en fetchAppointments:", error);
				}
			},




			//aacción para agregar una cita en el backend y actualizar el store
			addAppointment: async (userId, doctorId, date, time, status) => {
				console.log("estos son los datos", userId, doctorId, date, time, status)
				let token = `Bearer ${localStorage.getItem("token")}`
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const response = await fetch(`${baseURL}api/appointments`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': token
						},
						body: JSON.stringify({ user_id: userId, doctor_id: doctorId, date: date, time: time, status: status }),
					});
					if (!response.ok) throw new Error("Error al agregar cita");
					const data = await response.json();
					console.log("ESTA ES LA DATA DE RESPUESTA DE ADDAPPOIMENT", data)
					const event = {
						id: data.appointment_id || data.id,
						title: `Cita con el Dr. ${data.doctor_name || ""}`,
						date: data.date,
					};
					const store = getStore();

					setStore({
						...store, events: [...store.events, event]

					}); 
					localStorage.setItem('user_id',data.user_id) 
					localStorage.setItem('doctor_id',data.doctor_id) 
					localStorage.setItem('date',data.data) 
					localStorage.setItem('time',data.time) 
					localStorage.setItem('status',data.status)



				} catch (error) {
					console.error("Error en addAppointment:", error);
				}
			},


			// login de admin funcionando!
			logInAdmin: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				console.log("esta es la base URL", baseURL)
				try {
					console.log("DATOS DE ENVIO", name, email, password)
					const response = await fetch(`${baseURL}api/logIn/admin`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						console.log("primera parada")
						const errorData = await response.json();
						console.log("error", errorData)
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json();
					console.log("DATOS DE RESPUESTA", data)
					let store = getStore();
					setStore({
						...store,
						admin: { name, email, role: data.role },
						token: data.access_token,
						message: "Inicio de sesión exitoso",
					});

					localStorage.setItem('token', data.access_token);
					localStorage.setItem("admin", JSON.stringify({ name, email, role: data.role }));
					localStorage.setItem('name', data.name);

					localStorage.setItem('email', data.email);
					localStorage.setItem('id', data.id);
					localStorage.setItem('role', data.role)

				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					let store = getStore();
					setStore({ ...store, message: error.message });
				}
			},

			// login de doctores funcionando
			logInDoc: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const response = await fetch(`${baseURL}api/logIn/doctor`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),

					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json();
					console.log("DATOS DE RESPUESTA", data)
					let store = getStore();
					setStore({
						...store,
						doctor: { name, email, role: data.role },
						token: data.access_token,
						message: "Inicio de sesión exitoso",
					});
					console.log("inicio de sesion exitoso")

					// Guardar en localStorage
					localStorage.setItem("token", data.access_token);
					localStorage.setItem("doctor", JSON.stringify({ name, email, role: data.role }));
					localStorage.setItem('name', data.name);
					localStorage.setItem('email', data.email);
					localStorage.setItem('id', data.id);
					localStorage.setItem('role', data.role)
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					let store = getStore();
					setStore({ ...store, message: error.message });
				}
			},

			// login de usuario
			logIn: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const response = await fetch(`${baseURL}api/logIn`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json();
					console.log("DATOS DE RESPUESTA", data)
					let store = getStore()
					setStore({
						...store,
						user: { name, email, role: data.role },
						token: data.access_token,
						message: "Inicio de sesión exitoso",
					});

					// Guardar en localStorage
					localStorage.setItem("token", data.access_token);
					localStorage.setItem("user", JSON.stringify({ name, email, role: data.role }));
					localStorage.setItem('name', data.name);
					localStorage.setItem('email', data.email);
					localStorage.setItem('id', data.id);
					localStorage.setItem('role', data.role)

				} catch (error) {
					console.error("Error al iniciar sesión:", error);
					let store = getStore();
					setStore({ ...store, message: error.message });
				}
			},

			logOut: () => {
				localStorage.removeItem("userData");
				localStorage.removeItem("role");
				setStore({ admin: null, doctor: null, user: null });
			},

			loadSession: () => {
				const storeAdmin = localStorage.getItem("admin");
				const storeDoctor = localStorage.getItem("doctor");
				const storedUser = localStorage.getItem("user");
				const storedToken = localStorage.getItem("token");
				let store = getStore();
				setStore({
					...store,
					admin: storeAdmin ? JSON.parse(storeAdmin) : null,
					doctor: storeDoctor ? JSON.parse(storeDoctor) : null,
					user: storedUser ? JSON.parse(storedUser) : null,
					token: storedToken || null,
				});
			},


			// Registro de pacientes
			RegistroPacientes: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const token = getStore().token;

					const response = await fetch(`${baseURL}api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						let errorMessage = 'Error desconocido';
						try {
							const errorData = await response.json();
							console.log('No registra', errorData)
							errorMessage = errorData.error || errorData.message || 'Error en la solicitud';
						} catch (error) {
							errorMessage = 'Error al procesar la respuesta del servidor';
							console.log('Datos del paciente:', data);
						}
						throw new Error(errorMessage);
					}

					const data = await response.json();
					let store = getStore();
					setStore({ ...store, user: { name, email, password }, users: [...getStore().users, { name, email, password }], token: data.access_token, message: 'Paciente registrado exitosamente' });
					localStorage.setItem('token', data.access_token);
					console.log("usuario creado", data)

				} catch (error) {
					console.error('Error al registrar paciente:', error);
					let store = getStore();
					setStore({ ...store, message: error.message });
				}
			},

			deleteUser: async (idUser) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idUser = idUser || getStore().user?.id || localStorage.getItem('id');

				if (!idUser) {
					console.error("Id usuario invalido:", idUser)
					return;
				}

				try {
					const token = getStore().token

					const response = await fetch(`${baseURL}api/delete_user/${idUser}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {

						const errorData = await response.json()
						throw new Error(errorData.error || "no se elimino el Usuario correctamente")
					}
					console.log("Usuario Eliminado Correctamente")

					const store = getStore();
					if (Array.isArray(store.users)) {
						let store = getStore();
						setStore({ ...store, users: [...store.users.filter(user => user.id !== idUser)] })
					}
					if (store.user && store.user.id === idUser) {
						localStorage.removeItem("token")
						let store = getStore();
						setStore({ ...store, user: null, token: null })
					}



				} catch (error) {
					console.error("error al eliminar usuario")
				}

			},

			deleteUser2: async (idUser) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idUser = idUser || getStore().user?.id || localStorage.getItem('id');

				if (!idUser) {
					console.error("Id usuario invalido:", idUser)
					return;
				}
				idUser = parseInt(idUser); // Convertir a número para evitar errores con la API


				try {
					const token = getStore().token

					const response = await fetch(`${baseURL}api/delete_user/${idUser}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {

						const errorData = await response.json()
						console.log("errorData", errorData)
						throw new Error(errorData.error || "no se elimino el Usuario correctamente")
					}
					console.log("Usuario Eliminado Correctamente")

					const store = getStore();
					if (Array.isArray(store.users)) {
						let store = getStore();
						setStore({ ...store, users: [...store.users.filter(user => user.id !== idUser)] })
					}
					if (store.user && store.user.id === idUser) {
						localStorage.removeItem("token")
						let store = getStore();
						setStore({ ...store, user: null, token: null })
					}



				} catch (error) {
					console.error("error al eliminar usuario")
				}

			},
			deleteUser2: async (idUser) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idUser = idUser || getStore().user?.id || localStorage.getItem('id');

				if (!idUser) {
					console.error("ID de usuario inválido:", idUser);
					return;
				}

				try {
					const token = getStore().token;

					const response = await fetch(`${baseURL}api/delete_user/${idUser}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || "No se eliminó el usuario correctamente");
					}

					console.log("Usuario eliminado correctamente");

					const store = getStore();
					if (Array.isArray(store.users)) {
						setStore({ users: store.users.filter(user => user.id !== parseInt(idUser)) });
					}

					if (store.user && store.user.id === parseInt(idUser)) {
						localStorage.removeItem("token");
						setStore({ user: null, token: null });
					}

				} catch (error) {
					console.error("Error al eliminar usuario", error);
				}
			},

			deleteDoctor: async (idDoctor) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idDoctor = idDoctor || getStore().doctor?.id || localStorage.getItem('id');
				if (!idDoctor) {
					console.error("Id usuario invalido:", idDoctor)
					return;
				}

				try {
					const token = getStore().token
					const response = await fetch(`${baseURL}api/delete_doctor/${idDoctor}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "no se elimino el Doctor correctamente")
					}
					const store = getStore();
					console.log(" se Elimino el usuario del Doctor correctamente")
					if (Array.isArray(store.doctors)) {
						let store = getStore();
						setStore({ ...store, doctors: [...store.doctors.filter(doctor => doctor.id !== idDoctor)] })
					}
					if (store.doctor && store.doctor.id === idDoctor) {
						localStorage.removeItem("token")
						let store = getStore();
						setStore({ ...store, doctor: null, token: null })
					}

				} catch (error) {
					console.error("error al eliminar dooctor:", error)

				}
			},
			deleteAdmin: async (idAdmin) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idAdmin = idAdmin || getStore().admin?.id || localStorage.getItem('id');
				if (!idAdmin) {
					console.error("Id usuario invalido:", idAdmin)
					return;
				}

				try {
					const token = getStore().token
					const response = await fetch(`${baseURL}api/delete_admin/${idAdmin}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "no se elimino el Admin correctamente")
					}
					const store = getStore();
					console.log(" se Elimino el usuario del Admin correctamente")
					if (Array.isArray(store.admins)) {
						let store = getStore();
						setStore({ ...store, admins: [...store.admins.filter(admin => admin.id !== idAdmin)] })
					}
					if (store.admin && store.admin.id === idAdmin) {
						localStorage.removeItem("token")
						let store = getStore();
						setStore({ ...store, admin: null, token: null })
					}

				} catch (error) {
					console.error("error al eliminar dooctor:", error)

				}
			},

			editUser: async (userBody, userid) => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					const actions = getActions();
					const token = getStore().token
					const response = await fetch(`${baseURL}api/edit_user/${userid}`, {
						method: "PUT",
						body: JSON.stringify(userBody),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						}
					})
					console.log(response)
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "No se pudo editar el usuario")

					}
					console.log("El usuario se edito correctamente")

					localStorage.setItem('name', userBody.name);
					localStorage.setItem('email', userBody.email);
					let store = getStore();
					setStore({
						...store,
						user: {
							...getStore().user,
							name: userBody.name,
							email: userBody.email
						}
					});
					return true


				} catch (error) {
					console.log("error al editar el usuario", error)
				}
			},


			editDoctor: async (docBody, docId) => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					const actions = getActions();
					const token = getStore().token
					const response = await fetch(`${baseURL}api/edit_doctor/${docId}`, {
						method: "PUT",
						body: JSON.stringify(docBody),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						}
					})
					console.log(response)
					if (!response.ok) {
						const errorData = await response.json()
						console.log("no me edite", errorData)
						throw new Error(errorData.error || "Error al editar usuario del Doctor")
					}
					console.log("El usuario de Doctor se edito correctamente")

					localStorage.setItem('name', docBody.name);
					localStorage.setItem('email', docBody.email);
					let store = getStore();
					setStore({
						...store,
						doctor: {
							...getStore().doctor,
							name: docBody.name,
							email: docBody.email
						}
					});

					return true

				} catch (error) {
					console.log("error al editar el usuario de Doctor", error)
				}
			},
			editAdmin: async (adminBody, adminId) => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					const actions = getActions();
					const token = getStore().token
					const response = await fetch(`${baseURL}api/edit_admin/${adminId}`, {
						method: "PUT",
						body: JSON.stringify(adminBody),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						}
					})
					console.log(response)
					if (!response.ok) {
						const errorData = await response.json()
						console.log("Error aqui", errorData)
						throw new Error(errorData.error || "No se pudo editar el usuario")

					}
					console.log("El usuario de Admin se edito correctamente")

					localStorage.setItem('name', adminBody.name);
					localStorage.setItem('email', adminBody.email);
					let store = getStore();
					setStore({
						...store,
						admin: {
							...getStore().admin,
							name: adminBody.name,
							email: adminBody.email
						}
					});
					return true


				} catch (error) {
					console.log("error al editar el usuario de Admin", error)
				}
			},


			// agregar doctores esta funcionando
			AddDoctor: async (name, email, specialty, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const token = getStore().token;

					const response = await fetch(`${baseURL}api/doctors`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({ name, email, specialty, password }),
					});

					if (!response.ok) {
						let errorMessage = 'Error desconocido';
						try {
							const errorData = await response.json();
							errorMessage = errorData.error || errorData.message || 'Error en la solicitud';
						} catch (err) {
							errorMessage = 'Error al procesar la respuesta del servidor';
							console.log('Datos del paciente:', data);
						}
						throw new Error(errorMessage);
					}

					const data = await response.json();
					let store = getStore();
					setStore({ ...store, doctor: { ...store, name, email, specialty }, token: data.access_token, message: 'Doctor registrado exitosamente' });
					localStorage.setItem('token', data.access_token);

				} catch (error) {
					console.error('Error al registrar doctor:', error);
					let store = getStore();
					setStore({ ...store, message: error.message });
				}
			},

			doctorsGet: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					let response = await fetch(`${baseURL}api/doctors`);

					if (!response.ok) {
						// Si la respuesta no es correcta, mostrar el texto de respuesta
						let errorText = await response.text();
						throw new Error(`Error en Doctors: ${errorText}`);
					}

					let data = await response.json();  // Convertimos la respuesta a JSON
					let store = getStore(); // Obtenemos el estado actual del store

					setStore({ ...store, doctor: data }); // Guardamos la lista de doctores en el store

				} catch (error) {
					console.error("Error obteniendo doctores:", error);
				}
			},
			pacientesGet: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					let response = await fetch(`${baseURL}api/user`);

					if (!response.ok) {
						// Si la respuesta no es correcta, mostrar el texto de respuesta
						let errorText = await response.text();
						throw new Error(`Error en Users: ${errorText}`);
					}

					let data = await response.json();  // Convertimos la respuesta a JSON
					let store = getStore(); // Obtenemos el estado actual del store

					setStore({ ...store, user: data }); // Guardamos la lista de doctores en el store

				} catch (error) {
					console.error("Error obteniendo doctores:", error);
				}
			},


			//funcion para eliminar citas 

			deleteAppointment: async (appointmentId) => {
				if (!appointmentId) {
					console.error("Error: appointmentId es inválido");
					return;
				}

				const baseURL = process.env.REACT_APP_BASE_URL;
				const store = getStore();
				const token = store.token;

				try {
					const response = await fetch(`${baseURL}api/appointments/${appointmentId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`,
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Error al eliminar la cita");
					}

					// Filtrar la cita eliminada y actualizar el store
					let store = getStore()
					setStore({ ...store, events: store.events.filter(event => event.id !== appointmentId) });

					console.log(`Cita con ID ${appointmentId} eliminada correctamente`);
				} catch (error) {
					console.error("Error en deleteAppointment:", error);
					let store = getStore()
					setStore({ ...store, message: error.message });
				}
			},






		},

	};
};

export default getState;
