using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Ingredients { get; set; }
        
        [Required]
        public string Instructions { get; set; }
        
        [Required]
        public int PrepTime { get; set; } // in minutes
    }
} 