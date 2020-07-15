using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccesor;
        public UserAccessor(IHttpContextAccessor httpContextAccesor)
        {
            this._httpContextAccesor = httpContextAccesor;
        }

        public string GetCurrentUserName()
        {
            var userName = _httpContextAccesor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return userName;
        }
    }
}