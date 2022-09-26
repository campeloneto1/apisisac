<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veiculo extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'veiculos';

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
    protected $with = ['subunidade', 'marca', 'modelo', 'cor'];


     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

     public function modelo()
    {
        return $this->belongsTo(Modelo::class);
    }

     public function cor()
    {
        return $this->belongsTo(Cor::class);
    }
}
