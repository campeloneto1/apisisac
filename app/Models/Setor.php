<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'setores';

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
    protected $with = ['subunidade', 'comandante', 'subcomandante'];


     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function comandante()
    {
        return $this->belongsTo(User::class,'comandante_id');
    }

    public function subcomandante()
    {
        return $this->belongsTo(User::class,'subcomandante_id');
    }

    public function users()
    {
        return $this->hasMany(User::class,'setor_id')->whereNull('users.boletim_saida')->orderBy('graduacao_id', 'desc')->orderBy('numeral', 'asc')->orderBy('matricula', 'asc');
    }
}
