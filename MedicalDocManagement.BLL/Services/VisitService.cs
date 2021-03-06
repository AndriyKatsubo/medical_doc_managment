﻿using System;
using System.Collections.Generic;
using System.Linq;

using MedicalDocManagement.BLL.DTO.Main;
using MedicalDocManagement.BLL.Helpers;
using MedicalDocManagement.BLL.Services.Abstract;
using MedicalDocManagment.DAL.Repository;
using MedicalDocManagment.DAL.Repository.Interfaces;
using System.Threading.Tasks;

namespace MedicalDocManagement.BLL.Services
{
    public class VisitsService : IVisitsService
    {
        private readonly IUnitOfWork _unitOfWork;

        public VisitsService()
        {
            _unitOfWork = new UnitOfWork();
        }

        public async Task<VisitDTO> CreateVisit(VisitDTO visitDTO)
        {
            var visit = VisitDTOHelper.DTOToEntity(visitDTO);

            _unitOfWork.VisitsRepository.Add(visit);
            _unitOfWork.Save();

            visit.Doctor = await _unitOfWork.UsersManager.FindByIdAsync(visit.DoctorId);
            visit.Patient = _unitOfWork.ChildrenCardsRepository.Get(p => p.Id == visit.PatientId)
                                                               .FirstOrDefault();

            return VisitDTOHelper.EntityToDTO(visit);
        }

        public List<VisitDTO> GetVisitsByPatientId(int patientId)
        {
            var visitsPatient = _unitOfWork.VisitsRepository.GetAll(visit => visit.PatientId == patientId)
                                                            .ToList();

            return VisitDTOHelper.EntitiesToDTOs(visitsPatient);
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}
