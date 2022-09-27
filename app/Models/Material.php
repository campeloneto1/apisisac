<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'materiais';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['material_tipo', 'marca', 'modelo'];


     public function material_tipo()
    {
        return $this->belongsTo(MaterialTipo::class);
    }

     public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

     public function modelo()
    {
        return $this->belongsTo(Modelo::class);
    }
    
}
