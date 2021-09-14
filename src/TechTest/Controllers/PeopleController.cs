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
            Person person = PersonRepository.Get(id);
            if (person == null)
            {
                return new NotFoundResult();
            } else
            {
                return new OkObjectResult(person);
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
            
            //Retrieve person from repo and update all properties.
            Person person = PersonRepository.Get(id);
            person.Enabled = personUpdate.Enabled;
            person.Authorised = personUpdate.Authorised;
            person.Colours = personUpdate.Colours;

            //Update in repo
            Person updatedPerson = PersonRepository.Update(person);

            //If person has been successfully updated, send result otherwise, throw exception.
            if (updatedPerson != null)
            {
                return new OkObjectResult(updatedPerson);
            } else
            {
                return new NotFoundResult();
            }
        }
    }
}