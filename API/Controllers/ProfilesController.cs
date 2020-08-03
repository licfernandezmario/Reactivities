using System.Threading.Tasks;
using Application.Photos;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetTask(string username)
        {
            return await Mediator.Send(new Datails.Query { UserName = username });
        }

        [HttpDelete]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

    }
}