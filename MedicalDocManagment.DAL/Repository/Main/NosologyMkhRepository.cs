﻿using MedicalDocManagment.DAL.Entities;
using MedicalDocManagment.DAL.Repository.Interfaces;

namespace MedicalDocManagment.DAL.Repository
{
    public class NosologyMkhRepository : GenericRepository<NosologyMkh>, INosologyMkhRepository
    {
        public NosologyMkhRepository(Context context) : base(context)
        {
        }
    }
}
