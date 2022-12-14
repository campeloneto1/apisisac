<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalaOcorrencia extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'escalas_ocorrencias';

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
    protected $with = ['escala', 'ocorrencia', 'user', 'subunidade'];


     public function escala()
    {
        return $this->belongsTo(Escala::class)->without(['subunidade']);
    }

    public function ocorrencia()
    {
        return $this->belongsTo(Ocorrencia::class);
    } 

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }  

    public function user()
    {
        return $this->belongsTo(User::class)->without(['perfil', 'setor', 'subunidade']);
    }   
}
