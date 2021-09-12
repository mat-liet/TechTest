using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TechTest.Repositories;
using TechTest.Repositories.Models;

namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()
        {
            // TODO: Step 1
            //
            // Implement a JSON endpoint that returns the full list
            // of people from the PeopleRepository. If there are zero
            // people returned from PeopleRepository then an empty
            // JSON array should be returned.
            List<Person> personList = (List<Person>)PersonRepository.GetAll();
            if (personList.Count == 0)
            {
                return new OkObjectResult(new string[] { });
            } else
            {
                return new OkObjectResult(personList);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // TODO: Step 2
            //
            // Implement a JSON endpoint that returns a single person
            // from the PeopleRepository based on the id parameter.
            // If null is returned from the PeopleRepository with
            // the supplied id then a NotFound should be returned.
            Person personOne = PersonRepository.Get(id);
            if (personOne == null)
            {
                return new NotFoundResult();
            } else
            {
                return new OkObjectResult(personOne);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {
            // TODO: Step 3
            //
            // Implement an endpoint that receives a JSON object to
            // update a person using the PeopleRepository based on
            // the id parameter. Once the person has been successfully
            // updated, the person should be returned from the endpoint.
            // If null is returned from the PeopleRepository then a
            // NotFound should be returned.
            Person oldPerson = PersonRepository.Get(id);
            oldPerson.Enabled = personUpdate.Enabled;
            oldPerson.Authorised = personUpdate.Authorised;
            oldPerson.Colours = personUpdate.Colours;

            Person updatedPerson = PersonRepository.Update(oldPerson);
            Person newPerson = PersonRepository.Get(id);

            if (updatedPerson == newPerson)
            {
                return new OkObjectResult(newPerson);
            } else
            {
                return new NotFoundResult();
            }
        }
    }
}