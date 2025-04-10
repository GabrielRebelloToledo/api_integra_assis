const UserType = {
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
    TUTOR: 'TUTOR',
    STUDENT: 'STUDENT',
  };
  
  Object.freeze(UserType); // Impede alterações no objeto para simular um enum
  
  export default UserType;